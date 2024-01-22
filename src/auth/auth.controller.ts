import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MinFileCountValidator } from './validator/fileTypeValidationCounter.validator';
import { MaxFileSizeValidator } from './validator/maxFilesSize.validator';
import { RegistrationFiles } from '../common/types/shared';
import { RefreshTokenDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({ type: SignInDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 10 },
      { name: 'avatar', maxCount: 1 },
    ]),
  )
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request, invalid file or json parameters.',
  })
  async signUp(
    @Body() signUp: SignUpDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addValidator(new MinFileCountValidator())
        .addValidator(new MaxFileSizeValidator())
        .build({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    test: RegistrationFiles,
  ) {
    return await this.authService.signUp(signUp, test);
  }

  @Post('token')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return await this.authService.refreshToken(dto);
  }
}
