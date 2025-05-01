import { Presigned } from 'domain/presigned/model/presigned.model';
import { GetPresignedsUseCase } from 'domain/presigned/use_case/get-presigneds.use-case';

export class GetPresignedsHandler {
  constructor(private readonly getPresignedUseCase: GetPresignedsUseCase) {}

  async execute(): Promise<Presigned[]> {
    return this.getPresignedUseCase.execute();
  }
}
