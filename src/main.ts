import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
    const allowedOrigins = [
    'https://front-projeto-clinica.vercel.app',
    'https://front-projeto-clinica-git-main-vitor-gabriels-projects-82d1d834.vercel.app',
    'https://front-projeto-clinica-psy2gkdkj.vercel.app'
  ];
  
  app.enableCors({
    origin: (origin, callback) => {
      // O 'origin' será a URL exata do seu front-end.
      // Em ambientes de teste, requisições do mesmo servidor (ex: Postman) podem não ter 'origin'.
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        console.log('CORS Aprovado para a origem:', origin);
        callback(null, true);
      } else {
        console.log('CORS Bloqueado para a origem:', origin);
        callback(new Error('Origem não permitida por CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Clinica')
    .setDescription('description')
    .setVersion('1.0')
    .addTag('Clinica')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

