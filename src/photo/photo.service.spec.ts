import { Test, TestingModule } from '@nestjs/testing';
import { promises } from 'fs';
import { PhotoService } from './photo.service';
import { S3Service } from '../s3/s3.service';
import { Repository } from 'typeorm';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { PHOTO_TYPES } from '../common/types/shared';
import { Client } from '../client/entities/client.entity';
import { dataSourceOptions } from '../common/db/data-source';
import {
  FileMock,
  PhotoMock,
  S3ResponseMock,
} from '../../test/utils/mock/user.mock';

class MockS3Service {
  async uploadFile(): Promise<ManagedUpload.SendData> {
    return S3ResponseMock;
  }
}

describe('PhotoService', () => {
  let photoService: PhotoService;
  // let s3Service: S3Service;
  let photoRepository: Repository<Photo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotoService,
        {
          provide: S3Service,
          useClass: MockS3Service,
        },
      ],
      imports: [
        TypeOrmModule.forRoot({ ...dataSourceOptions }),
        TypeOrmModule.forFeature([Photo, Client]),
      ],
    }).compile();

    photoService = module.get<PhotoService>(PhotoService);
    // s3Service = module.get<S3Service>(S3Service);
    photoRepository = module.get<Repository<Photo>>(getRepositoryToken(Photo));
  });

  it('should be defined', () => {
    expect(photoService).toBeDefined();
  });

  describe('getDefaultAvatar', () => {
    it('should get the default avatar', async () => {
      jest.spyOn(photoRepository, 'findOne').mockResolvedValueOnce(PhotoMock);

      const result = await photoService.getDefaultAvatar();

      expect(result).toBeInstanceOf(Photo);
    });
  });

  describe('createDefaultAvatar', () => {
    it('should create a default avatar', async () => {
      jest.spyOn(promises, 'readFile').mockResolvedValueOnce(Buffer.from(''));
      jest.spyOn(photoService, 'createPhoto').mockResolvedValue(PhotoMock);
      const result = await photoService.createDefaultAvatar();

      expect(result).toBeInstanceOf(Photo);
    });
  });

  describe('createPhoto', () => {
    it('should create a photo', async () => {
      const mockS3Record: ManagedUpload.SendData = {
        ETag: 'mockETag',
        Location: 'mockLocation',
        Bucket: 'bucket',
        Key: 'key',
      };

      jest.spyOn(photoRepository, 'save').mockResolvedValueOnce(new Photo());

      const result = await photoService.createPhoto(
        'mockType',
        mockS3Record,
        1,
      );

      expect(result).toBeInstanceOf(Photo);
    });
  });

  describe('uploadPhotoAndSave', () => {
    it('should upload a photo and save it', async () => {
      jest.spyOn(photoRepository, 'save').mockResolvedValueOnce(new Photo());
      const result = await photoService.uploadPhotoAndSave(
        PHOTO_TYPES.IMAGE,
        FileMock,
        1,
      );

      expect(result).toBeInstanceOf(Photo);
    });
  });

  describe('uploadMultiplePhotosAndSave', () => {
    it('should upload multiple photos and save them', async () => {
      jest
        .spyOn(photoService, 'uploadPhotoAndSave')
        .mockResolvedValueOnce(PhotoMock);
      jest.spyOn(photoRepository, 'save').mockResolvedValue(PhotoMock);
      const result = await photoService.uploadMultiplePhotosAndSave(
        1,
        PHOTO_TYPES.IMAGE,
        [FileMock, FileMock],
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Photo);
      expect(result[1]).toBeInstanceOf(Photo);
    });
  });
});
