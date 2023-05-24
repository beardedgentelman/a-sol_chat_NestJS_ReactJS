import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    credentials: true,
    origin: /http:\/\/localhost:3000\//i,
  });
  app.use('../uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(PORT);
}
bootstrap();
