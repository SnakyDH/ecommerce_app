import { GetProductsUseCase } from 'domain/products/use_case/get-products.use-case';
import { GetProductsHandler } from '../get-products.handler';
import { GetProductsRequestDto } from '../../dtos/get-products-request.dto';
import { Product } from 'domain/products/model/product.model';
import { PaginationModel } from 'domain/common/util/pagination.model';
import { ProductMapper } from '../../mappers/product.mapper';

jest.mock('../../dtos/get-products-request.dto', () => {
  return {
    GetProductsRequestDto: jest.fn().mockImplementation(() => {
      return {
        page: 1,
        limit: 10,
      };
    }),
  };
});

describe('GetProductsHandler', () => {
  let handler: GetProductsHandler;
  let useCase: jest.Mocked<GetProductsUseCase>;

  beforeEach(() => {
    useCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetProductsUseCase>;

    handler = new GetProductsHandler(useCase);
  });

  it('should call the use case with the correct parameters', async () => {
    // Arrange
    const dto = { page: 2, limit: 20 } as GetProductsRequestDto;
    const paginationModel = PaginationModel.create<Product>(
      [
        {
          id: 1,
          name: 'Producto 1',
          image: 'imagen1.jpg',
          price: 100,
          stock: 10,
        },
        {
          id: 2,
          name: 'Producto 2',
          image: 'imagen2.jpg',
          price: 200,
          stock: 20,
        },
      ],
      2,
      2,
      20,
    );
    useCase.execute.mockResolvedValue(paginationModel);

    // Act
    await handler.execute(dto);

    // Assert
    expect(useCase.execute).toHaveBeenCalledWith(2, 20);
  });

  it('should transform the use case response correctly', async () => {
    // Arrange
    const dto = { page: 1, limit: 10 } as GetProductsRequestDto;
    const paginationModel = PaginationModel.create<Product>(
      [
        {
          id: 1,
          name: 'Producto 1',
          image: 'imagen1.jpg',
          price: 100,
          stock: 10,
        },
        {
          id: 2,
          name: 'Producto 2',
          image: 'imagen2.jpg',
          price: 200,
          stock: 20,
        },
      ],
      2,
      1,
      10,
    );
    useCase.execute.mockResolvedValue(paginationModel);

    // Spy en el mapper
    const mapperSpy = jest.spyOn(ProductMapper, 'toPaginatedProductsDto');

    // Act
    const result = await handler.execute(dto);

    // Assert
    expect(mapperSpy).toHaveBeenCalledWith(paginationModel);
    expect(result).toEqual({
      data: [
        {
          id: 1,
          name: 'Producto 1',
          image: 'imagen1.jpg',
          price: 100,
          stock: 10,
        },
        {
          id: 2,
          name: 'Producto 2',
          image: 'imagen2.jpg',
          price: 200,
          stock: 20,
        },
      ],
      total: 2,
      page: 1,
      totalPages: 1,
    });
  });

  it('should use default values when not provided in the DTO', async () => {
    // Arrange
    const dtoMock = { page: 1, limit: 10 } as GetProductsRequestDto;
    const paginationModel = PaginationModel.create<Product>(
      [
        {
          id: 1,
          name: 'Producto 1',
          image: 'imagen1.jpg',
          price: 100,
          stock: 10,
        },
      ],
      1,
      1,
      10,
    );
    useCase.execute.mockResolvedValue(paginationModel);

    // Act
    await handler.execute(dtoMock);

    // Assert
    expect(useCase.execute).toHaveBeenCalledWith(1, 10);
  });
});
