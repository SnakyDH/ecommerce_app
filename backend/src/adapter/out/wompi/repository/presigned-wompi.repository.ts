import { Presigned } from 'domain/presigned/model/presigned.model';
import { IPresignedRepository } from 'domain/presigned/repository/presigned-repository.interface';
import { envOptions } from 'src/config/env.options';
import { GetPresignedResponseDto } from '../dtos/get-presigned-response.dto';
import { PresignedWompiMapper } from '../mappers/presigned-wompi.mapper';

export class PresignedWompiService implements IPresignedRepository {
  async getPresigneds(): Promise<Presigned[]> {
    const response = await fetch(
      `${envOptions.wompi.baseUrl}/merchants/${envOptions.wompi.publicKey}`,
    );
    const data = (await response.json()) as GetPresignedResponseDto;

    return PresignedWompiMapper.toDomainList(data);
  }
}
