import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from '../auth/dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
  async create(dto: SignUpDto): Promise<User> {
    const user = new User();
    user.email = dto.email;
    user.password = dto.password;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.role = 'user';
    const saved = await this.userRepository.save(user);
    return saved;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(`user.email=:email`, {email})
      .addSelect('user.password')
      .getOne();
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({where: {id}});
  }
}
