import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  });

  await app.listen(PORT);
}
bootstrap();
