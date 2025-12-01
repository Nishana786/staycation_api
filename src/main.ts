import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  Allow JSON body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //  Allow frontend to connect
  app.enableCors();

  await app.listen(4000);
  console.log(' Nest backend running on http://localhost:4000');
}
bootstrap();
