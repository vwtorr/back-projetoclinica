import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import helmet from 'helmet';
import compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente antes de tudo
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Segurança e performance
  app.use(helmet());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // --- CORS LIBERADO PARA TUDO ---
  app.enableCors({
    origin: '*', // Permite qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Documentação Swagger (ativa somente em desenvolvimento)
  const environment = process.env.ENVIRONMENT || 'development';
  if (environment === 'development') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle(process.env.NAME || 'API')
      .setDescription(process.env.NAME || 'Documentação da API')
      .setVersion(process.env.VERSION || '1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.DOCS_URL || 'docs', app, document);
  }

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor rodando na porta ${port}`);
}
bootstrap();