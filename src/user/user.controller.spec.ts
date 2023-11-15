import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Request } from 'express';
import { UserMock } from '../../test/utils/mock/user.mock';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { dataSourceOptions } from '../common/db/test_data-source';
import { IRequest } from '../common/types/shared';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot({...dataSourceOptions}),
        TypeOrmModule.forFeature([User])
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should return the user from the request', async () => {
    const mockRequest: Partial<IRequest> = { user: UserMock };
    const result = await controller.me(mockRequest as Request);

    expect(result).toEqual(UserMock);
  });
});
