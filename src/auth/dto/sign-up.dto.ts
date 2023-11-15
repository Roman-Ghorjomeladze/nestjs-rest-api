import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { AuthValidationTexts } from '../constants';

export class SignUpDto {
  @ApiProperty({
    description: AuthValidationTexts.auth.email,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: AuthValidationTexts.auth.password,
  })
  @Matches(/^(?=.*\d).{6,}$/, { message: AuthValidationTexts.auth.password })
  @Length(2, 50)
  password: string;

  @ApiProperty({
    description: AuthValidationTexts.notEmpty,
  })
  @IsString()
  @Length(2, 25)
  firstName: string;

  @ApiProperty({
    description: AuthValidationTexts.notEmpty,
  })
  @IsString()
  @Length(2, 25)
  lastName: string;
}
