import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { GetProductsRequestDto } from '../dtos/get-products-request.dto';
import { PaginatedProductsResponseDto } from '../dtos/get-products-response.dto';
import { GetProductsHandler } from '../handler/get-products.handler';
import { HttpExceptionHandler } from '../handler/http-exception.handler';
import { CustomException } from 'domain/common/exceptions/custom.exception';

@Controller('products')
export class ProductController {
  constructor(
    private readonly getProductsHandler: GetProductsHandler,
    private readonly httpExceptionHandler: HttpExceptionHandler,
  ) {}

  @Get()
  async getProducts(
    @Query()
    getProductsDto: GetProductsRequestDto,
  ): Promise<PaginatedProductsResponseDto> {
    try {
      return await this.getProductsHandler.execute(getProductsDto);
    } catch (error) {
      if (error instanceof CustomException) {
        return this.httpExceptionHandler.handle(error);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
