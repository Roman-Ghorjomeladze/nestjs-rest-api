import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ClientService } from './client/client.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const jwtService = app.get(JwtService);
  const clientService = app.get(ClientService);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new AuthGuard(jwtService, clientService));
  const config = new DocumentBuilder()
    .setTitle('CobbleWeb')
    .setDescription('The CobbleWeb home assignment API')
    .setVersion('1.0')
    .addTag('cobbleWeb')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(configService.get('common.port'), () => {
    Logger.log(`Started on PORT->${configService.get('common.port')}`)
  });
}
bootstrap();
