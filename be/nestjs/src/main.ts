import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { firebaseConfig } from './config/firebase.config';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Enable CORS
  app.enableCors();

  // Khởi tạo Firebase app
  firebase.initializeApp(firebaseConfig);
  const config = new DocumentBuilder()
    .setTitle('Api example')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Tests')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
