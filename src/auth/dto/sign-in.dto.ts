import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AuthValidationTexts } from '../constants';

export class SignInDto {
  @ApiProperty({
    description: AuthValidationTexts.auth.email,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: AuthValidationTexts.auth.password,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
