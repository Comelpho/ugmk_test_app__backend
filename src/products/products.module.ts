import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { ProductsController } from './products.controller';
import { Parser } from './utils/products.parser';

@Module({
  imports: [CsvModule],
  providers: [Parser],
  controllers: [ProductsController],
})
export class ProductsModule {}
