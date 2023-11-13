import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';

@Module({
    imports: [TypeOrmModule.forRoot({...dataSourceOptions, autoLoadEntities: true})]
})
export class DbModule {}
