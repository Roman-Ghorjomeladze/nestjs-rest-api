import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { S3Service } from '../s3/s3.service';
import { PhotoModule } from '../photo/photo.module';
import { PhotoService } from '../photo/photo.service';
import { ClientService } from '../client/client.service';
import { ClientModule } from '../client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    S3Service,
    PhotoService,
    ClientService,
  ],
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('common.jwt_secret'),
          signOptions: { expiresIn: '2h' },
        };
      },
      inject: [ConfigService],
    }),
    PhotoModule,
    ClientModule,
    TypeOrmModule.forFeature([Client]),
  ],
})
export class AuthModule {}
