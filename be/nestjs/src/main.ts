import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { firebaseConfig } from './config/firebase.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(process.env.APP_PORT);
}
bootstrap();
