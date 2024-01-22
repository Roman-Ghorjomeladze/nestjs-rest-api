import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { dataSourceOptions } from '../common/db/test_data-source';
import { Photo } from '../photo/entities/photo.entity';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { ClientMock } from '../../test/utils/mock/user.mock';

describe('ClientService', () => {
  let service: ClientService;
  let clientRepository: Repository<Client>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
      imports: [
        TypeOrmModule.forRoot({ ...dataSourceOptions }),
        TypeOrmModule.forFeature([Photo, Client]),
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    clientRepository = module.get<Repository<Client>>(
      getRepositoryToken(Client),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createClient', () => {
    it('should create a new client', async () => {
      const userId = ClientMock.userId;
      const avatarId = ClientMock.avatarId;
      const fullName = ClientMock.fullName;

      jest.spyOn(clientRepository, 'save').mockResolvedValueOnce(ClientMock);

      const result = await service.createClient(userId, avatarId, fullName);

      expect(result).toBeInstanceOf(Client);
      expect(result.userId).toEqual(userId);
      expect(result.avatarId).toEqual(avatarId);
      expect(result.fullName).toEqual(fullName);
    });
  });

  describe('getClientByUserId', () => {
    it('should get a client by userId', async () => {
      const userId = ClientMock.userId;

      jest.spyOn(clientRepository, 'findOne').mockResolvedValueOnce(ClientMock);

      const result = await service.getClientByUserId(userId);

      expect(result).toBeInstanceOf(Client);
      expect(result.userId).toEqual(userId);
    });
  });

  describe('getClientById', () => {
    it('should get a client by id', async () => {
      const clientId = ClientMock.id;

      jest.spyOn(clientRepository, 'findOne').mockResolvedValueOnce(ClientMock);

      const result = await service.getClientById(clientId);

      expect(result).toBeInstanceOf(Client);
      expect(result.id).toEqual(clientId);
    });
  });
});
