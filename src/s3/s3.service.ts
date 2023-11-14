import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;
  private readonly AWS_S3_BUCKET: string;
  constructor(private configService: ConfigService) {
    AWS.config.update({
      region: this.configService.get('aws.region'),
    });
    this.AWS_S3_BUCKET = this.configService.get('aws.s3_bucket_name');
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('aws.access_key_id'),
      secretAccessKey: this.configService.get('aws.secret_access_key'),
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;
    return this.s3_upload(
      file,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(
    file: Express.Multer.File,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
