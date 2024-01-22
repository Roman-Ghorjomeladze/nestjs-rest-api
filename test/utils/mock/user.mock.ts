import { ManagedUpload } from 'aws-sdk/clients/s3';
import { SignInDto } from '../../../src/auth/dto/sign-in.dto';
import { SignUpDto } from '../../../src/auth/dto/sign-up.dto';
import { Client } from '../../../src/client/entities/client.entity';
import { Photo } from '../../../src/photo/entities/photo.entity';
import { User } from '../../../src/user/entities/user.entity';

export const ClientMock: Client = (() => {
  const client = new Client();
  client.id = 1;
  client.userId = 1;
  client.fullName = 'James Web';
  client.avatar = null;
  client.avatarId = null;
  client.createdAt = new Date();
  client.updatedAt = new Date();
  client.photos = [];
  client.user = null;
  return client;
})();

export const PhotoMock: Photo = (() => {
  const photo = new Photo();
  photo.id = 1;
  photo.clientId = 1;
  photo.client = ClientMock;
  photo.url = 'https =//mydomain.com/myiamge.png';
  photo.etag = 'dfafadaf';
  photo.key = 'avatar';
  return photo;
})();

export const UserMock: User = (() => {
  const user = new User();
  user.id = 1;
  user.lastName = 'James';
  user.firstName = 'Web';
  user.role = 'Client';
  user.active = true;
  user.createdAt = new Date();
  user.updatedAt = new Date();
  user.password = 'hashpassword';
  user.client = [ClientMock];
  user.email = 'james@web.ge';
  user.hashPassword = (): Promise<void> => {
    return;
  };
  return user;
})();

export const SignInDtoMock: SignInDto = {
  password: 'password',
  email: 'james@jordan.ge',
};
export const SignUpDtoMock: SignUpDto = {
  firstName: 'James',
  lastName: 'Jordan',
  email: 'james@jordan.ge',
  password: 'pwdpwd1',
};

export const FileMock: Express.Multer.File = {
  buffer: Buffer.from(''),
  mimetype: 'image/png',
  size: 1024 * 10,
  filename: 'dfAvatar.png',
  stream: null,
  destination: '',
  fieldname: '',
  originalname: 'dfAvatar.png',
  path: 'public/images/dfAvatar.png',
  encoding: '7bit',
};

export const S3ResponseMock: ManagedUpload.SendData = {
  ETag: 'mockETag',
  Location: 'mockLocation',
  Bucket: 'bucket',
  Key: 'key',
};
