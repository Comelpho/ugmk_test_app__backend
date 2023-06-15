import { Controller, Get, Query } from '@nestjs/common';
import { Parser } from './utils/products.parser';
import { Products } from './dto/products.utils.dto';

@Controller()
export class ProductsController {
  constructor(private parser: Parser) {}
  @Get('/products')
  async getProducts(@Query() request: Products) {
    if (Object.keys(request).length > 0) {
      const { list } = await this.parser.getCSVProducts();

      if (request.factory_id && request['month']) {
        const factory_id: number = Number(request.factory_id);
        const month: number = Number(request['month']);

        return list.filter((item) => {
          if (item.date) {
            const date = new Date();
            const itemDate = item.date.split('/');
            date.setFullYear(
              Number(itemDate[2]),
              Number(itemDate[1]) - 1,
              Number(itemDate[0]),
            );

            return (
              date.getMonth() == month - 1 && item.factory_id == factory_id
            );
          }
        });
      }

      if (request.factory_id) {
        const param = request.factory_id;
        return list.filter((item) => {
          return item.factory_id == param;
        });
      }

      if (request.id) {
        const param = request.id;
        return list.find((item) => {
          return item.id == param;
        });
      }

      return list;
    } else {
      return (await this.parser.getCSVProducts()).list;
    }
  }
}
