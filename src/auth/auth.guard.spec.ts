import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PublicRoutes } from './constants';
import { ClientService } from '../client/client.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;
  let configService: ConfigService;
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ClientService,
          useValue: {
            getClientByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
    clientService = module.get<ClientService>(ClientService);
  });

  it('should allow access to public routes', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          route: { path: '/api/auth/login' },
        }),
      }),
    };

    const result = await guard.canActivate(context as any);

    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException for missing token', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          route: { path: '/api/me' },
          headers: {},
        }),
      }),
    };

    await expect(guard.canActivate(context as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
