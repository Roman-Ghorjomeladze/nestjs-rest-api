import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { S3Service } from '../s3/s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';

@Module({
  controllers: [],
  providers: [PhotoService, S3Service],
  imports: [TypeOrmModule.forFeature([Photo])],
  exports: [TypeOrmModule],
})
export class PhotoModule {}
