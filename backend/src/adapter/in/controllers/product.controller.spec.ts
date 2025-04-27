import { Test, TestingModule } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductController } from './product.controller';
import { GetProductsHandler } from '../handler/get-products.handler';
import { HttpExceptionHandler } from '../handler/http-exception.handler';
import { GetProductsRequestDto } from '../dtos/get-products-request.dto';
import {
  PaginatedProductsResponseDto,
  ProductResponseDto,
} from '../dtos/get-products-response.dto';
import { CustomException } from 'domain/common/exceptions/custom.exception';
import { ConstantsException } from 'domain/common/exceptions/constants.exception';

describe('ProductController', () => {
  let controller: ProductController;
  let mockGetProductsHandler: { execute: jest.Mock };

  beforeEach(async () => {
    mockGetProductsHandler = {
      execute: jest.fn(),
    };

    const mockHttpExceptionHandler = {
      handle: jest.fn().mockImplementation((error: CustomException) => {
        if (error.message === ConstantsException.PRODUCT_NOT_FOUND.toString()) {
          throw new NotFoundException(error.message);
        }
        throw new InternalServerErrorException(error.message);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: GetProductsHandler,
          useValue: mockGetProductsHandler,
        },
        {
          provide: HttpExceptionHandler,
          useValue: mockHttpExceptionHandler,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('returns products paginated correctly', async () => {
      // Arrange
      const getProductsDto: GetProductsRequestDto = {
        page: 1,
        limit: 10,
      };

      const mockProduct: ProductResponseDto = {
        id: 1,
        name: 'Producto de prueba',
        image: 'imagen.jpg',
        price: 100,
        stock: 10,
      };

      const expectedResponse: PaginatedProductsResponseDto = {
        data: [mockProduct],
        total: 1,
        page: 1,
        totalPages: 1,
      };

      mockGetProductsHandler.execute.mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.getProducts(getProductsDto);

      // Assert
      expect(mockGetProductsHandler.execute).toHaveBeenCalledWith(
        getProductsDto,
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should throw NotFoundException when a CustomException with PRODUCT_NOT_FOUND is thrown', async () => {
      // Arrange
      const getProductsDto: GetProductsRequestDto = {
        page: 1,
        limit: 10,
      };

      const customError = new CustomException(
        ConstantsException.PRODUCT_NOT_FOUND,
      );

      mockGetProductsHandler.execute.mockRejectedValue(customError);

      // Act & Assert
      await expect(controller.getProducts(getProductsDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockGetProductsHandler.execute).toHaveBeenCalledWith(
        getProductsDto,
      );
    });

    it('should throw InternalServerErrorException when an unexpected error occurs', async () => {
      // Arrange
      const getProductsDto: GetProductsRequestDto = {
        page: 1,
        limit: 10,
      };

      const error = new Error('Unexpected error');
      mockGetProductsHandler.execute.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.getProducts(getProductsDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockGetProductsHandler.execute).toHaveBeenCalledWith(
        getProductsDto,
      );
    });
  });
});
