import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

  async signIn(dto: SignInDto): Promise<any> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
        throw new NotFoundException('User with such credentials does not exists!')
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { sub: user.id, name: user.firstName };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: result
    };
  }
  async signUp(dto: SignUpDto): Promise<any> {
    const userWithSuchEmailExists = await this.usersService.findByEmail(dto.email);
    if (userWithSuchEmailExists) {
        return new BadRequestException('User with such email already exists!');
    }
    const {password, ...user} = await this.usersService.create(dto);
    return user;
  }
}
