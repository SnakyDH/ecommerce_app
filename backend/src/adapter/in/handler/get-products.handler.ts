import { GetProductsUseCase } from 'domain/products/use_case/get-products.use-case';
import { GetProductsRequestDto } from '../dtos/get-products-request.dto';
import { PaginatedProductsResponseDto } from '../dtos/get-products-response.dto';
import { ProductMapper } from '../mappers/product.mapper';

export class GetProductsHandler {
  constructor(private readonly getProductsUseCase: GetProductsUseCase) {}

  async execute(
    getProductsDto: GetProductsRequestDto,
  ): Promise<PaginatedProductsResponseDto> {
    const { page, limit } = getProductsDto;
    const productsModel = await this.getProductsUseCase.execute(page, limit);
    return ProductMapper.toPaginatedProductsDto(productsModel);
  }
}
