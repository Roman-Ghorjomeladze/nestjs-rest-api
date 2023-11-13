import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

import { ConfigModule } from './common/config/config.module';
import { DbModule } from './common/db/db.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    DbModule,
    UserModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    ConfigService,
  ],
})
export class AppModule {}
