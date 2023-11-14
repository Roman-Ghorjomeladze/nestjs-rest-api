import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import configuration from './configuration';
import { config } from 'dotenv';
import * as Joi from 'joi';
config();

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        port: Joi.number().default(3000),
        jwt_secret: Joi.string(),
        database: Joi.object({
          port: Joi.number().default(5432),
          host: Joi.string().default('localhost'),
          user: Joi.string().required(),
          password: Joi.string().required(),
          name: Joi.string().required(),
          typeorm_synchronize: Joi.boolean().default(false),
          typeorm_logging: Joi.boolean().default(false),
        }),
        aws: Joi.object({
          access_key_id: Joi.string().required(),
          secret_access_key: Joi.string().required(),
          sdk_load_config: Joi.string().required(),
          s3_bucket_name: Joi.string().required(),
          s3_bucket_region: Joi.string().required(),
        }),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
