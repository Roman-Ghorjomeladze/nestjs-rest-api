import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/config/config.module';
import { DbModule } from './common/db/db.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { S3Service } from './s3/s3.service';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ConfigModule, DbModule, UserModule, AuthModule, ClientModule],
  controllers: [AppController],
  providers: [AppService, ConfigService, S3Service],
})
export class AppModule {}
