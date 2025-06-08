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

  // --- PREPARAÇÃO DAS VARIÁVEIS DE AMBIENTE ---
  // Adiciona '|| ""' para garantir que, se a variável não existir, o código não quebre.
  const allowedOrigins = (process.env.URLS || '').split(',').map((url) => url.trim());
  const allowedMethods = (process.env.METHODS || '').split(',');

  // --- MIDDLEWARES E CONFIGURAÇÕES GLOBAIS ---
  app.use(helmet()); // Padrões de segurança do Helmet. Mais seguro que uma configuração customizada com falhas.
  app.use(compression());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors({
    origin: allowedOrigins,
    methods: allowedMethods,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // --- SWAGGER (DOCUMENTAÇÃO) ---
  // Corrigido para usar a variável de ambiente correta e evitar erros.
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

  // --- INICIALIZAÇÃO ---
  const port = process.env.APP_PORT || 3000; // Usa a porta do .env ou 3000 como padrão.
  await app.listen(port);
  console.log(`🚀 Servidor rodando na porta ${port}`);
  if (environment === 'development') {
    console.log(`📚 Documentação disponível em http://localhost:${port}/${process.env.DOCS_URL || 'docs'}`);
  }
}
bootstrap();