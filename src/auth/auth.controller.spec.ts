import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserService } from '../../src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PhotoService } from '../../src/photo/photo.service';
import { ClientService } from '../../src/client/client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from '../../src/s3/s3.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../../src/user/user.module';
import { dataSourceOptions } from '../../src/common/db/test_data-source';
import { Photo } from '../../src/photo/entities/photo.entity';
import { AuthService } from './auth.service';
import { Client } from '../client/entities/client.entity';
import { ClientMock, SignInDtoMock, SignUpDtoMock } from '../../test/utils/mock/user.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    jest.mock('aws-sdk')
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        UserModule,
        ConfigModule,
        TypeOrmModule.forRoot({...dataSourceOptions }),
        TypeOrmModule.forFeature([Photo, Client]),
      ],
      exports: [],
      providers: [
        AuthService,
        UserService,
        JwtService,
        PhotoService,
        ClientService, 
        S3Service,
        Photo
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  })

  it('should return client after signup', async () => {
    jest.spyOn(authService, 'signUp').mockResolvedValue(ClientMock);
    const result = await authService.signUp(SignUpDtoMock, {images: []});
    expect(result).toBe(ClientMock);
  })

  it('should return client after signin', async () => {
    jest.spyOn(authService, 'signIn').mockResolvedValue(ClientMock);
    const result = await authService.signIn(SignInDtoMock);
    expect(result).toBe(ClientMock);
  })
});

