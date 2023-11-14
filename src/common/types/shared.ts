import { Request } from 'express';
import { User } from '../../user/entities/user.entity';

export type RegistrationFiles = {
  images: Express.Multer.File[];
  avatar?: Express.Multer.File[];
};

export enum PHOTO_TYPES {
  DEFAULT_AVATAR = 'default_avatar',
  AVATAR = 'avatar',
  IMAGE = 'image',
}

export interface IRequest extends Request {
  user: User;
}
