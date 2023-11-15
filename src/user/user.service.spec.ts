import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { dataSourceOptions } from '../common/db/test_data-source';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDtoMock, UserMock } from '../../test/utils/mock/user.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot({...dataSourceOptions}),
        TypeOrmModule.forFeature([User])
      ]
    }).compile();
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    jest.spyOn(userRepository, 'save').mockResolvedValue(UserMock);
    const user = await service.create(SignUpDtoMock);
    
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  })

  it('should find user by email', async () => {
    jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValueOnce({
      where: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValueOnce(UserMock),
    } as any);
    const result = await service.findByEmail('test@example.com');

    expect(result).toEqual(UserMock);
  })

  it('should find user by id', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(UserMock);
    const result = await service.findById(1);

    expect(result).toBeDefined();
    expect(result).toEqual(UserMock);
  })
});
