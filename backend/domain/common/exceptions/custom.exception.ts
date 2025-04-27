import { ConstantsException } from './constants.exception';

export class CustomException extends Error {
  constructor(message: ConstantsException) {
    super(message);
  }
}
