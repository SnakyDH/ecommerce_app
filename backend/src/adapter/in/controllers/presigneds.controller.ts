import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { GetPresignedsHandler } from '../handler/get-presigneds.handler';
import { Presigned } from 'domain/presigned/model/presigned.model';
import { HttpExceptionHandler } from '../handler/http-exception.handler';
import { CustomException } from 'domain/common/exceptions/custom.exception';

@Controller('presigneds')
export class PresignedsController {
  constructor(
    private readonly getPresignedsHandler: GetPresignedsHandler,
    private readonly httpExceptionHandler: HttpExceptionHandler,
  ) {}

  @Get()
  async getPresigneds(): Promise<Presigned[]> {
    try {
      return this.getPresignedsHandler.execute();
    } catch (error) {
      if (error instanceof CustomException) {
        return this.httpExceptionHandler.handle(error);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
