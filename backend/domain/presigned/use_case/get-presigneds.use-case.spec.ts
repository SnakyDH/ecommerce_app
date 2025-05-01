import { GetPresignedsUseCase } from './get-presigneds.use-case';
import { IPresignedRepository } from '../repository/presigned-repository.interface';
import { Presigned } from '../model/presigned.model';
import { PresignedType } from '../model/presigned.type';
import { CustomException } from 'domain/common/exceptions/custom.exception';
import { ConstantsException } from 'domain/common/exceptions/constants.exception';

describe('GetPresignedsUseCase', () => {
  let useCase: GetPresignedsUseCase;
  let mockPresignedRepository: jest.Mocked<IPresignedRepository>;

  beforeEach(() => {
    mockPresignedRepository = {
      getPresigneds: jest.fn(),
    } as unknown as jest.Mocked<IPresignedRepository>;

    useCase = new GetPresignedsUseCase(mockPresignedRepository);
  });

  describe('execute', () => {
    it('should return presigneds when repository returns data', async () => {
      // Arrange
      const expectedPresigneds: Presigned[] = [
        new Presigned(
          'https://example.com/acceptance',
          PresignedType.END_USER_POLICY,
          'acceptance_token_1',
        ),
        new Presigned(
          'https://example.com/personal-data',
          PresignedType.PERSONAL_DATA_AUTH,
          'acceptance_token_2',
        ),
      ];

      mockPresignedRepository.getPresigneds.mockResolvedValue(
        expectedPresigneds,
      );

      // Act
      const result = await useCase.execute();

      // Assert
      expect(result).toEqual(expectedPresigneds);
      expect(mockPresignedRepository.getPresigneds).toHaveBeenCalledTimes(1);
    });

    it('should throw PRE_SIGNED_NOT_FOUND when repository returns empty array', async () => {
      // Arrange
      mockPresignedRepository.getPresigneds.mockResolvedValue([]);

      // Act & Assert
      await expect(useCase.execute()).rejects.toThrow(
        new CustomException(ConstantsException.PRE_SIGNED_NOT_FOUND),
      );
      expect(mockPresignedRepository.getPresigneds).toHaveBeenCalledTimes(1);
    });

    it('should throw GET_PRESIGNED_ERROR when repository returns null', async () => {
      // Arrange
      mockPresignedRepository.getPresigneds.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute()).rejects.toThrow(
        new CustomException(ConstantsException.GET_PRESIGNED_ERROR),
      );
      expect(mockPresignedRepository.getPresigneds).toHaveBeenCalledTimes(1);
    });

    it('should throw GET_PRESIGNED_ERROR when repository throws error', async () => {
      // Arrange
      const error = new Error('Repository error');
      mockPresignedRepository.getPresigneds.mockRejectedValue(error);

      // Act & Assert
      await expect(useCase.execute()).rejects.toThrow(
        new CustomException(ConstantsException.GET_PRESIGNED_ERROR),
      );
      expect(mockPresignedRepository.getPresigneds).toHaveBeenCalledTimes(1);
    });
  });
});
