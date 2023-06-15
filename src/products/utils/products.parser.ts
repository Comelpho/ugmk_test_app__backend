import { Injectable } from '@nestjs/common';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { createReadStream, promises as fsPromises } from 'fs';
import { Products } from '../dto/products.utils.dto';

@Injectable()
export class Parser {
  constructor(private readonly csvParser: CsvParser) {}

  async getCSVProducts(): Promise<ParsedData<Products>> {
    const data = await fsPromises.readFile(process.env.URLDATA_PRODUCTS, {
      encoding: 'utf-8',
    });

    const replaceData = data
      .replace(/^\uFEFF/gm, '')
      .replace(/^\u00BB\u00BF/gm, '');

    if (replaceData != data) {
      await fsPromises.writeFile(process.env.URLDATA_PRODUCTS, replaceData, {
        encoding: 'utf8',
      });
    }

    const stream = createReadStream(process.env.URLDATA_PRODUCTS, {
      encoding: 'utf8',
    });

    const entities: ParsedData<Products> = await this.csvParser.parse(
      stream,
      Products,
      undefined,
      undefined,
      {
        separator: ',',
        bom: true,
      },
    );

    return entities;
  }
}
