import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { FileMock, S3ResponseMock } from '../../test/utils/mock/user.mock';

jest.mock('aws-sdk');

describe('S3Service', () => {
  let service: S3Service;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        ConfigService,
      ]
    }).compile();

    service = module.get<S3Service>(S3Service);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file to S3', async () => {
      jest.spyOn(configService, 'get').mockReturnValueOnce('test_param');
      jest.spyOn(service, 's3_upload').mockResolvedValueOnce(S3ResponseMock);
      const result = await service.uploadFile(FileMock);

      expect(result).toEqual(S3ResponseMock);
    });

  });

  describe('s3_upload', () => {
    it('should upload a file to S3 with the provided parameters', async () => {
      const bucket = 'test-bucket';
      const name = 'test-file.txt';
      const mimetype = 'text/plain';

      (AWS.S3.prototype.upload as jest.MockedFunction<any>).mockImplementationOnce(() => ({
        promise: jest.fn().mockResolvedValueOnce(S3ResponseMock),
      }));
      const result = await service.s3_upload(
        FileMock,
        bucket,
        name,
        mimetype,
      );

      expect(result).toEqual(S3ResponseMock);
    });
  });
});
