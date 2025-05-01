import { ConstantsException } from 'domain/common/exceptions/constants.exception';
import { CustomException } from './../../../../domain/common/exceptions/custom.exception';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

export class HttpExceptionHandler {
  handle(exception: CustomException): never {
    if (exception.message === ConstantsException.PRODUCT_NOT_FOUND.toString()) {
      throw new NotFoundException(exception.message);
    }
    if (
      exception.message === ConstantsException.PRE_SIGNED_NOT_FOUND.toString()
    ) {
      throw new NotFoundException(exception.message);
    }
    if (
      exception.message === ConstantsException.GET_PRESIGNED_ERROR.toString()
    ) {
      throw new InternalServerErrorException(exception.message);
    }
    throw new InternalServerErrorException(exception.message);
  }
}
