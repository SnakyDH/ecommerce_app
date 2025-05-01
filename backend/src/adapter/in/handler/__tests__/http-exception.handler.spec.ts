import { HttpExceptionHandler } from '../http-exception.handler';
import { CustomException } from 'domain/common/exceptions/custom.exception';
import { ConstantsException } from 'domain/common/exceptions/constants.exception';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('HttpExceptionHandler', () => {
  let handler: HttpExceptionHandler;

  beforeEach(() => {
    handler = new HttpExceptionHandler();
  });

  it('should throw NotFoundException when product not found exception is received', () => {
    // Arrange
    const customException = new CustomException(
      ConstantsException.PRODUCT_NOT_FOUND,
    );

    // Act & Assert
    expect(() => handler.handle(customException)).toThrow(NotFoundException);
    expect(() => handler.handle(customException)).toThrow(
      ConstantsException.PRODUCT_NOT_FOUND,
    );
  });

  it('should throw NotFoundException when presigned not found exception is received', () => {
    // Arrange
    const customException = new CustomException(
      ConstantsException.PRE_SIGNED_NOT_FOUND,
    );

    // Act & Assert
    expect(() => handler.handle(customException)).toThrow(NotFoundException);
    expect(() => handler.handle(customException)).toThrow(
      ConstantsException.PRE_SIGNED_NOT_FOUND,
    );
  });

  it('should throw InternalServerErrorException when get presigned error exception is received', () => {
    // Arrange
    const customException = new CustomException(
      ConstantsException.GET_PRESIGNED_ERROR,
    );

    // Act & Assert
    expect(() => handler.handle(customException)).toThrow(
      InternalServerErrorException,
    );
    expect(() => handler.handle(customException)).toThrow(
      ConstantsException.GET_PRESIGNED_ERROR,
    );
  });

  it('should throw InternalServerErrorException for other exceptions', () => {
    // Arrange
    const customException = new CustomException('Generic error' as any);

    // Act & Assert
    expect(() => handler.handle(customException)).toThrow(
      InternalServerErrorException,
    );
    expect(() => handler.handle(customException)).toThrow('Generic error');
  });
});
