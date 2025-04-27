import { PaginationModel } from 'domain/common/util/pagination.model';
import { Product } from 'domain/products/model/product.model';
import { PaginatedProductsResponseDto } from '../../dtos/get-products-response.dto';
import { ProductMapper } from '../product.mapper';

describe('ProductMapper', () => {
  describe('toProductDto', () => {
    it('should map a product model to a product DTO', () => {
      // Arrange
      const product: Product = {
        id: 1,
        name: 'Test Product',
        image: 'image.jpg',
        price: 100,
        stock: 10,
      };

      // Act
      const result = ProductMapper.toProductDto(product);

      // Assert
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual({
        id: 1,
        name: 'Test Product',
        image: 'image.jpg',
        price: 100,
        stock: 10,
      });
    });
  });

  describe('toPaginatedProductsDto', () => {
    it('should map a pagination model to a paginated products DTO', () => {
      // Arrange
      const products: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          image: 'image1.jpg',
          price: 100,
          stock: 10,
        },
        {
          id: 2,
          name: 'Product 2',
          image: 'image2.jpg',
          price: 200,
          stock: 20,
        },
      ];

      const paginationModel = new PaginationModel<Product>(
        products,
        10, // total
        2, // page
        5, // totalPages
      );

      // Spy on toProductDto method
      const toProductDtoSpy = jest.spyOn(ProductMapper, 'toProductDto');

      // Act
      const result = ProductMapper.toPaginatedProductsDto(paginationModel);

      // Assert
      expect(result).toBeInstanceOf(PaginatedProductsResponseDto);

      // Check if toProductDto was called for each product
      expect(toProductDtoSpy).toHaveBeenCalledTimes(2);
      expect(toProductDtoSpy).toHaveBeenCalledWith(products[0]);
      expect(toProductDtoSpy).toHaveBeenCalledWith(products[1]);

      // Check if all properties were mapped correctly
      expect(result.data.length).toBe(2);
      expect(result.data[0]).toEqual({
        id: 1,
        name: 'Product 1',
        image: 'image1.jpg',
        price: 100,
        stock: 10,
      });
      expect(result.data[1]).toEqual({
        id: 2,
        name: 'Product 2',
        image: 'image2.jpg',
        price: 200,
        stock: 20,
      });
      expect(result.total).toBe(10);
      expect(result.page).toBe(2);
      expect(result.totalPages).toBe(5);
    });

    it('should handle empty array of products', () => {
      // Arrange
      const paginationModel = new PaginationModel<Product>(
        [], // empty array
        0, // total
        1, // page
        0, // totalPages
      );

      // Act
      const result = ProductMapper.toPaginatedProductsDto(paginationModel);

      // Assert
      expect(result).toBeInstanceOf(PaginatedProductsResponseDto);
      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(0);
    });
  });
});
