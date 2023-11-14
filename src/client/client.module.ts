import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
  providers: [ClientService],
  imports: [TypeOrmModule.forFeature([Client])],
})
export class ClientModule {}
