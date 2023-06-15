import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductsModule, ConfigModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
