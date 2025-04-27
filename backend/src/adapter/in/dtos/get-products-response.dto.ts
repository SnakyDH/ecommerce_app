export class ProductResponseDto {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
}

export class PaginatedProductsResponseDto {
  data: ProductResponseDto[];
  total: number;
  page: number;
  totalPages: number;
}
