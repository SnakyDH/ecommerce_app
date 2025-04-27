import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '../product.repository';
import { PaginationModel } from 'domain/common/util/pagination.model';

describe('ProductRepository', () => {
  let repository: ProductRepository;
  let productRepository: jest.Mocked<Repository<ProductEntity>>;

  beforeEach(async () => {
    // Mock del repositorio TypeORM
    const mockRepository = {
      findAndCount: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
    productRepository = module.get(getRepositoryToken(ProductEntity));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      // Arrange
      const mockProducts: ProductEntity[] = [
        {
          id: 1,
          name: 'Product 1',
          image: 'image1.jpg',
          price: 100,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Product 2',
          image: 'image2.jpg',
          price: 200,
          stock: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const page = 1;
      const limit = 10;
      const total = 2;

      productRepository.findAndCount.mockResolvedValue([mockProducts, total]);

      // Act
      const result = await repository.findAll(page, limit);

      // Assert
      expect(productRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0, // (page - 1) * limit
        take: limit,
      });

      // Verify that the result is a PaginationModel
      expect(result).toBeInstanceOf(PaginationModel);
      expect(result.data).toEqual(mockProducts);
      expect(result.total).toBe(total);
      expect(result.page).toBe(page);
      expect(result.totalPages).toBe(1); // Math.ceil(total / limit)
    });

    it('should calculate pagination correctly for multiple pages', async () => {
      // Arrange
      const mockProducts = [
        {
          id: 1,
          name: 'Product 1',
          image: 'image1.jpg',
          price: 100,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const page = 2;
      const limit = 10;
      const total = 15; // Esto debería generar 2 páginas en total

      productRepository.findAndCount.mockResolvedValue([mockProducts, total]);

      // Act
      const result = await repository.findAll(page, limit);

      // Assert
      expect(productRepository.findAndCount).toHaveBeenCalledWith({
        skip: 10, // (page - 1) * limit
        take: limit,
      });

      expect(result.data).toEqual(mockProducts);
      expect(result.total).toBe(total);
      expect(result.page).toBe(page);
      expect(result.totalPages).toBe(2); // Math.ceil(15 / 10) = 2
    });

    it('should handle empty result', async () => {
      // Arrange
      const mockProducts: ProductEntity[] = [];
      const page = 1;
      const limit = 10;
      const total = 0;

      productRepository.findAndCount.mockResolvedValue([mockProducts, total]);

      // Act
      const result = await repository.findAll(page, limit);

      // Assert
      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.page).toBe(page);
      expect(result.totalPages).toBe(0); // Math.ceil(0 / 10) = 0
    });
  });
});
