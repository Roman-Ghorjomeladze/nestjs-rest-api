import { Injectable } from '@nestjs/common';
import { promises } from 'fs';

import { Photo } from './entities/photo.entity';
import { S3Service } from '../s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneType } from 'aws-sdk/clients/connect';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { PHOTO_TYPES } from '../common/types/shared';

@Injectable()
export class PhotoService {
  constructor(
    private s3Service: S3Service,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) {}

  async getDefaultAvatar(): Promise<Photo> {
    return await this.photoRepository.findOne({
      where: { key: PHOTO_TYPES.DEFAULT_AVATAR },
    });
  }

  async createDefaultAvatar(): Promise<Photo> {
    const file = await promises.readFile('public/images/dfAvatar.png');
    const avatar = await this.s3Service.uploadFile({
      buffer: file,
      mimetype: 'image/png',
      size: 1024 * 10,
      filename: 'dfAvatar.png',
      stream: null,
      destination: '',
      fieldname: '',
      originalname: 'dfAvatar.png',
      path: 'public/images/dfAvatar.png',
      encoding: '7bit',
    });
    return await this.createPhoto(PHOTO_TYPES.DEFAULT_AVATAR, avatar);
  }

  async createPhoto(
    type: PhoneType,
    s3Record: ManagedUpload.SendData,
    clientId?: number,
  ): Promise<Photo> {
    const photo = new Photo();
    photo.etag = s3Record.ETag;
    photo.url = s3Record.Location;
    photo.clientId = clientId;
    photo.key = type;
    return await this.photoRepository.save(photo);
  }

  async uploadPhotoAndSave(
    type: PHOTO_TYPES,
    file: Express.Multer.File,
    clientId?: number,
  ): Promise<Photo> {
    const photo = await this.s3Service.uploadFile(file);
    return await this.createPhoto(type, photo, clientId);
  }

  async uploadMultiplePhotosAndSave(
    clientId: number,
    type: PHOTO_TYPES,
    files: Express.Multer.File[],
  ): Promise<Photo[]> {
    const uploadPromises = files.map((file) =>
      this.uploadPhotoAndSave(type, file, clientId),
    );
    const uploadedPhotos = await Promise.all(uploadPromises);
    return uploadedPhotos;
  }
}
