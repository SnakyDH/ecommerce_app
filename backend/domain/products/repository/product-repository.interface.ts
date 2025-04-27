import { PaginationModel } from 'domain/common/util/pagination.model';
import { Product } from '../model/product.model';

export interface IProductRepository {
  findAll(page: number, limit: number): Promise<PaginationModel<Product>>;
}
