import { GetProductsUseCase } from '../get-products.use-case';
import { IProductRepository } from '../../repository/product-repository.interface';
import { PaginationModel } from 'domain/common/util/pagination.model';
import { Product } from '../../model/product.model';
import { CustomException } from 'domain/common/exceptions/custom.exception';
import { ConstantsException } from 'domain/common/exceptions/constants.exception';

describe('GetProductsUseCase', () => {
  let useCase: GetProductsUseCase;
  let productRepository: jest.Mocked<IProductRepository>;

  beforeEach(() => {
    // Mock del repositorio
    productRepository = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<IProductRepository>;

    useCase = new GetProductsUseCase(productRepository);
  });

  it('should return products when found', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const mockProducts: Product[] = [
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
      mockProducts,
      2,
      page,
      1,
    );

    // Mock del repositorio
    productRepository.findAll.mockResolvedValue(paginationModel);

    // Act
    const result = await useCase.execute(page, limit);

    // Assert
    expect(productRepository.findAll).toHaveBeenCalledWith(page, limit);
    expect(result).toBe(paginationModel);
    expect(result.data).toEqual(mockProducts);
    expect(result.total).toBe(2);
    expect(result.page).toBe(page);
    expect(result.totalPages).toBe(1);
  });

  it('should throw exception when no products are found', async () => {
    // Arrange
    const page = 1;
    const limit = 10;

    // Empty products array
    const paginationModel = new PaginationModel<Product>([], 0, page, 0);

    productRepository.findAll.mockResolvedValue(paginationModel);

    // Act & Assert
    await expect(useCase.execute(page, limit)).rejects.toThrow(CustomException);
    await expect(useCase.execute(page, limit)).rejects.toThrow(
      ConstantsException.PRODUCT_NOT_FOUND,
    );
  });

  it('should pass pagination parameters to repository', async () => {
    // Arrange
    const page = 2;
    const limit = 20;

    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        image: 'image1.jpg',
        price: 100,
        stock: 10,
      },
    ];

    const paginationModel = new PaginationModel<Product>(
      mockProducts,
      1,
      page,
      1,
    );

    productRepository.findAll.mockResolvedValue(paginationModel);

    // Act
    await useCase.execute(page, limit);

    // Assert
    expect(productRepository.findAll).toHaveBeenCalledWith(page, limit);
  });

  it('should propagate repository exceptions', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const error = new Error('Database error');

    productRepository.findAll.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(page, limit)).rejects.toThrow(error);
  });
});
