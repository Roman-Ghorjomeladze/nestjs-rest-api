import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import configuration from './configuration';
import { config } from 'dotenv';
import * as Joi from 'joi';
config({ path: '.env' });

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
      cache: false,
      isGlobal: true,
      validationSchema: Joi.object({
        database: Joi.object({
          port: Joi.number().required(),
          host: Joi.string().required(),
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
        common: Joi.object({
          port: Joi.required(),
          jwt_secret: Joi.string(),
        }),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
