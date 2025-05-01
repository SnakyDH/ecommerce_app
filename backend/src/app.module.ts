import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/data-source.options';
import { ProductModule } from './modules/product.module';
import { PresignedModule } from './modules/presigned.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductModule,
    PresignedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
