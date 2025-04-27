import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/adapter/out/postgres/entities/product.entity';
import { ProductRepository } from 'src/adapter/out/postgres/repository/product.repository';
import { GetProductsUseCase } from 'domain/products/use_case/get-products.use-case';
import { ProductController } from '../adapter/in/controllers/product.controller';
import { GetProductsHandler } from '../adapter/in/handler/get-products.handler';
import { ProductMapper } from '../adapter/in/mappers/product.mapper';
import { HttpExceptionHandler } from 'src/adapter/in/handler/http-exception.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: GetProductsUseCase,
      useFactory: (productRepository: ProductRepository) =>
        new GetProductsUseCase(productRepository),
      inject: ['IProductRepository'],
    },
    {
      provide: GetProductsHandler,
      useFactory: (getProductsUseCase: GetProductsUseCase) =>
        new GetProductsHandler(getProductsUseCase),
      inject: [GetProductsUseCase],
    },
    ProductMapper,
    HttpExceptionHandler,
  ],
  exports: [GetProductsHandler, ProductMapper],
})
export class ProductModule {}
