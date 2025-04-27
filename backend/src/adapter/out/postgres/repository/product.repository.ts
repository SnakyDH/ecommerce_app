import { InjectRepository } from '@nestjs/typeorm';
import { PaginationModel } from 'domain/common/util/pagination.model';
import { Product } from 'domain/products/model/product.model';
import { IProductRepository } from 'domain/products/repository/product-repository.interface';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';

export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginationModel<Product>> {
    const [products, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return PaginationModel.create(products, total, page, limit);
  }
}
