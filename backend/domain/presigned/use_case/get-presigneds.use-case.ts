import { ConstantsException } from 'domain/common/exceptions/constants.exception';
import { CustomException } from 'domain/common/exceptions/custom.exception';
import { Presigned } from '../model/presigned.model';
import { IPresignedRepository } from '../repository/presigned-repository.interface';

export class GetPresignedsUseCase {
  constructor(private readonly presignedRepository: IPresignedRepository) {}

  async execute(): Promise<Presigned[]> {
    const presigneds = await this.presignedRepository.getPresigneds();
    if (presigneds.length === 0) {
      throw new CustomException(ConstantsException.PRE_SIGNED_NOT_FOUND);
    }
    if (!presigneds) {
      throw new CustomException(ConstantsException.GET_PRESIGNED_ERROR);
    }
    return presigneds;
  }
}
