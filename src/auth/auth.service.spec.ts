import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PhotoService } from '../photo/photo.service';
import { ClientService } from '../client/client.service';
import * as bcrypt from 'bcrypt';

import {
  ClientMock,
  PhotoMock,
  SignInDtoMock,
  SignUpDtoMock,
  UserMock,
} from '../../test/utils/mock/user.mock';
import { NotFoundException } from '@nestjs/common';

jest.mock('../user/user.service');
jest.mock('@nestjs/jwt');
jest.mock('../photo/photo.service');
jest.mock('../client/client.service');
jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userServiceMock: jest.Mocked<UserService>;
  let jwtServiceMock: jest.Mocked<JwtService>;
  let photoServiceMock: jest.Mocked<PhotoService>;
  let clientServiceMock: jest.Mocked<ClientService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        PhotoService,
        ClientService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userServiceMock = module.get<UserService>(
      UserService,
    ) as jest.Mocked<UserService>;
    jwtServiceMock = module.get<JwtService>(
      JwtService,
    ) as jest.Mocked<JwtService>;
    photoServiceMock = module.get<PhotoService>(
      PhotoService,
    ) as jest.Mocked<PhotoService>;
    clientServiceMock = module.get<ClientService>(
      ClientService,
    ) as jest.Mocked<ClientService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const signInTest = async (
    bcryptResult: boolean,
    findByEmailResult = UserMock,
  ) => {
    userServiceMock.findByEmail.mockResolvedValueOnce(findByEmailResult);
    jwtServiceMock.verifyAsync.mockResolvedValueOnce({});
    clientServiceMock.getClientByUserId.mockResolvedValueOnce(ClientMock);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(jest.fn().mockResolvedValue(bcryptResult));
    const result = await service.signIn(SignInDtoMock);
    return result;
  };

  describe('should test the signIn method', () => {
    it('should return valid response when user provides correct credential', async () => {
      const result = await signInTest(true);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('access_token');
    });
    it('should throw an error when user provides incorrect password', async () => {
      await expect(async () => await signInTest(false)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error when user provides incorrect email', async () => {
      await expect(async () => await signInTest(true, null)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  it('should test the signUp method', async () => {
    userServiceMock.create.mockResolvedValueOnce(UserMock);
    photoServiceMock.getDefaultAvatar.mockResolvedValueOnce(PhotoMock);
    photoServiceMock.createDefaultAvatar.mockResolvedValueOnce(PhotoMock);
    clientServiceMock.createClient.mockResolvedValueOnce(ClientMock);
    photoServiceMock.uploadMultiplePhotosAndSave.mockResolvedValueOnce([
      PhotoMock,
    ]);

    const result = await service.signUp(SignUpDtoMock, {
      images: [],
      avatar: [],
    });

    expect(result).toBeDefined();
    expect(result).toBe(ClientMock);
  });
});
