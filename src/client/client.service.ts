import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  async createClient(userId: number, avatarId: number, fullName: string) {
    const client = new Client();
    client.avatarId = avatarId;
    client.userId = userId;
    client.fullName = fullName;
    return await this.clientRepository.save(client);
  }

  async getClientByUserId(userId: number): Promise<Client> {
    return await this.clientRepository.findOne({
      where: { userId },
      relations: ['avatar', 'photos'],
    });
  }

  async getClientById(id: number): Promise<Client> {
    return await this.clientRepository.findOne({
      where: { id },
      relations: ['avatar'],
    });
  }
}
