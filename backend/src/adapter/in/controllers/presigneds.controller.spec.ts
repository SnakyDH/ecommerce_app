import { PresignedsController } from './presigneds.controller';
import { GetPresignedsHandler } from '../handler/get-presigneds.handler';
import { HttpExceptionHandler } from '../handler/http-exception.handler';
import { Presigned } from 'domain/presigned/model/presigned.model';
import { PresignedType } from 'domain/presigned/model/presigned.type';
import { CustomException } from 'domain/common/exceptions/custom.exception';
import { ConstantsException } from 'domain/common/exceptions/constants.exception';

describe('PresignedsController', () => {
  let controller: PresignedsController;
  let mockGetPresignedsHandler: jest.Mocked<GetPresignedsHandler>;
  let mockHttpExceptionHandler: jest.Mocked<HttpExceptionHandler>;

  beforeEach(() => {
    mockGetPresignedsHandler = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetPresignedsHandler>;

    mockHttpExceptionHandler = {
      handle: jest.fn(),
    } as unknown as jest.Mocked<HttpExceptionHandler>;

    controller = new PresignedsController(
      mockGetPresignedsHandler,
      mockHttpExceptionHandler,
    );
  });

  describe('getPresigneds', () => {
    it('should return presigneds when handler returns data', async () => {
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

      mockGetPresignedsHandler.execute.mockResolvedValue(expectedPresigneds);

      // Act
      const result = await controller.getPresigneds();

      // Assert
      expect(result).toEqual(expectedPresigneds);
      expect(mockGetPresignedsHandler.execute).toHaveBeenCalledTimes(1);
    });

    it('should handle CustomException with HttpExceptionHandler', async () => {
      // Arrange
      const customException = new CustomException(
        ConstantsException.PRE_SIGNED_NOT_FOUND,
      );
      const notFoundException = new Error(
        ConstantsException.PRE_SIGNED_NOT_FOUND,
      );

      mockGetPresignedsHandler.execute.mockRejectedValue(customException);
      mockHttpExceptionHandler.handle.mockImplementation(() => {
        throw notFoundException;
      });

      // Act & Assert
      await expect(controller.getPresigneds()).rejects.toThrow(
        ConstantsException.PRE_SIGNED_NOT_FOUND,
      );
      expect(mockGetPresignedsHandler.execute).toHaveBeenCalledTimes(1);
      expect(mockHttpExceptionHandler.handle).toHaveBeenCalledWith(
        customException,
      );
    });

    it('should throw error for non-CustomException errors', async () => {
      // Arrange
      const error = new Error('Generic error');
      mockGetPresignedsHandler.execute.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.getPresigneds()).rejects.toThrow('Generic error');
      expect(mockGetPresignedsHandler.execute).toHaveBeenCalledTimes(1);
      expect(mockHttpExceptionHandler.handle).not.toHaveBeenCalled();
    });
  });
});
