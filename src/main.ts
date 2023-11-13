import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ValidationPipe } from '@nestjs/common';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const userService = app.get(UserService);
  const jwtService = app.get(JwtService);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalGuards(new AuthGuard(jwtService, configService, userService));

  const config = new DocumentBuilder()
    .setTitle('CobbleWeb')
    .setDescription('The CobbleWeb home assignment API')
    .setVersion('1.0')
    .addTag('cobbleWeb')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(configService.get('port'));
}
bootstrap();
