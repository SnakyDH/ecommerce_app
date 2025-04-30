import { Module } from '@nestjs/common';
import { PresignedWompiService } from 'src/adapter/out/wompi/repository/presigned-wompi.repository';
import { GetPresignedsUseCase } from 'domain/presigned/use_case/get-presigneds.use-case';
import { GetPresignedsHandler } from 'src/adapter/in/handler/get-presigneds.handler';
import { HttpExceptionHandler } from 'src/adapter/in/handler/http-exception.handler';
import { PresignedsController } from 'src/adapter/in/controllers/presigneds.controller';

@Module({
  imports: [],
  controllers: [PresignedsController],
  providers: [
    {
      provide: 'IPresignedRepository',
      useClass: PresignedWompiService,
    },
    {
      provide: GetPresignedsUseCase,
      useFactory: (presignedRepository: PresignedWompiService) =>
        new GetPresignedsUseCase(presignedRepository),
      inject: ['IPresignedRepository'],
    },
    {
      provide: GetPresignedsHandler,
      useFactory: (getPresignedsUseCase: GetPresignedsUseCase) =>
        new GetPresignedsHandler(getPresignedsUseCase),
      inject: [GetPresignedsUseCase],
    },
    HttpExceptionHandler,
  ],
  exports: [GetPresignedsHandler],
})
export class PresignedModule {}
