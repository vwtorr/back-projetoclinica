// 1. Instale o dotenv: yarn add dotenv
import * as dotenv from 'dotenv';
// 2. Carregue as variáveis de ambiente ANTES de qualquer outro código
dotenv.config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // --- MIDDLEWARES E CONFIGURAÇÕES GLOBAIS ---
  app.use(helmet()); // Padrões de segurança do Helmet. Mais seguro que uma configuração customizada com falhas.
  app.use(compression());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors({
    origin: '*',
    methods: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  const environment = process.env.ENVIRONMENT || 'production';

  if (environment === 'development') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle(process.env.NAME || 'API')
      .setDescription(process.env.NAME || 'API Docs')
      .setVersion(process.env.VERSION || '1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.DOCS_URL || 'docs', app, document, {
      swaggerOptions: {
        filter: true,
        docExpansion: 'none',
        operationsSorter: 'alpha',
        tagsSorter: 'alpha',
        showRequestDuration: true,
      },
    });
  }

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
}
bootstrap();