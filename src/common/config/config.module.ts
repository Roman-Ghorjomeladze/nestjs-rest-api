import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';

@Module({
    imports: [
        NestConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            validationSchema: Joi.object({
                port: Joi.number().default(3000),
                jwt_secreta: Joi.string(),
                database: Joi.object({
                    port: Joi.number().default(5432),
                    host: Joi.string().default('localhost'),
                    user: Joi.string().required(),
                    password: Joi.string().required(),
                    name: Joi.string().required(),
                    typeorm_synchronize: Joi.boolean().default(false),
                    typeorm_logging: Joi.boolean().default(false),
                }),
            }),
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule { }
