import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AuthValidationTexts } from '../constants';

export class RefreshTokenDto {
  @ApiProperty({
    description: AuthValidationTexts.auth.refresh,
  })
  @IsString()
  refreshToken: string;

}
