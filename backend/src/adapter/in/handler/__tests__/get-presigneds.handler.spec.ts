import { GetPresignedsHandler } from '../get-presigneds.handler';
import { GetPresignedsUseCase } from 'domain/presigned/use_case/get-presigneds.use-case';
import { Presigned } from 'domain/presigned/model/presigned.model';
import { PresignedType } from 'domain/presigned/model/presigned.type';

describe('GetPresignedsHandler', () => {
  let handler: GetPresignedsHandler;
  let mockGetPresignedsUseCase: jest.Mocked<GetPresignedsUseCase>;

  beforeEach(() => {
    mockGetPresignedsUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetPresignedsUseCase>;

    handler = new GetPresignedsHandler(mockGetPresignedsUseCase);
  });

  describe('execute', () => {
    it('should return presigneds when use case returns data', async () => {
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

      mockGetPresignedsUseCase.execute.mockResolvedValue(expectedPresigneds);

      // Act
      const result = await handler.execute();

      // Assert
      expect(result).toEqual(expectedPresigneds);
      expect(mockGetPresignedsUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw error when use case throws error', async () => {
      // Arrange
      const error = new Error('Test error');
      mockGetPresignedsUseCase.execute.mockRejectedValue(error);

      // Act & Assert
      await expect(handler.execute()).rejects.toThrow('Test error');
      expect(mockGetPresignedsUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
