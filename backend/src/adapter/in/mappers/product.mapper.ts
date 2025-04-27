import { PaginationModel } from 'domain/common/util/pagination.model';
import { Product } from 'domain/products/model/product.model';
import {
  PaginatedProductsResponseDto,
  ProductResponseDto,
} from '../dtos/get-products-response.dto';

export class ProductMapper {
  static toProductDto(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      stock: product.stock,
    };
  }

  static toPaginatedProductsDto(
    paginationModel: PaginationModel<Product>,
  ): PaginatedProductsResponseDto {
    const paginatedDto = new PaginatedProductsResponseDto();
    paginatedDto.data = paginationModel.data.map((product) =>
      this.toProductDto(product),
    );
    paginatedDto.total = paginationModel.total;
    paginatedDto.page = paginationModel.page;
    paginatedDto.totalPages = paginationModel.totalPages;
    return paginatedDto;
  }
}
