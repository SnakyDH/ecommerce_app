import { CustomException } from 'domain/common/exceptions/custom.exception';
import { ConstantsException } from 'domain/common/exceptions/constants.exception';
import { Product } from '../model/product.model';
import { IProductRepository } from '../repository/product-repository.interface';
import { PaginationModel } from '../../common/util/pagination.model';

export class GetProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    page: number,
    limit: number,
  ): Promise<PaginationModel<Product>> {
    const products = await this.productRepository.findAll(page, limit);
    if (products.data.length <= 0) {
      throw new CustomException(ConstantsException.PRODUCT_NOT_FOUND);
    }
    return products;
  }
}
