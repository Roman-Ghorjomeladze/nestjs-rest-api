import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PHOTO_TYPES, RegistrationFiles } from '../common/types/shared';
import { PhotoService } from '../photo/photo.service';
import { ClientService } from '../client/client.service';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private photosService: PhotoService,
    private clientService: ClientService,
  ) {}

  async signIn(dto: SignInDto): Promise<any> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundException(
        'User with such credentials does not exists!',
      );
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    try {
      const client = await this.clientService.getClientByUserId(user.id);
      const payload = {
        sub: { userId: user.id, role: user.role, clientId: client.id },
        name: user.firstName,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
        user: client,
      };
    } catch (error) {
      console.error('AuthService.sigIn:', error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async signUp(dto: SignUpDto, files: RegistrationFiles): Promise<any> {
    const userWithSuchEmailExists = await this.usersService.findByEmail(
      dto.email,
    );
    if (userWithSuchEmailExists) {
      return new BadRequestException('User with such email already exists!');
    }
    try {
      const user = await this.usersService.create(dto);
      // If user is uploading avatar, it'll be used. If user doesn't have an avatar, the one that is in public folder will be used.
      // If user doesn't have an avatar, At first the database will be checked. If there is default avatar already uploaded, that will be used.
      // If user doesn't have an avatar but there is at least one default avatar in db, it'll be used.

      let avatar = null;
      if (!files.avatar || files.avatar.length < 1) {
        avatar = await this.photosService.getDefaultAvatar();
        if (!avatar) {
          avatar = await this.photosService.createDefaultAvatar();
        }
      } else {
        avatar = await this.photosService.uploadPhotoAndSave(
          PHOTO_TYPES.AVATAR,
          files.avatar[0],
        );
      }
      const client = await this.clientService.createClient(
        user.id,
        avatar.id,
        `${dto.firstName} ${dto.lastName}`,
      );
      // This part is not awaited as we don't need this info directly to the FRONT END
      this.photosService.uploadMultiplePhotosAndSave(
        client.id,
        PHOTO_TYPES.IMAGE,
        files.images,
      );
      client.avatar = avatar;
      return client;
    } catch (error) {
      console.error('AuthService.signUp:', error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
