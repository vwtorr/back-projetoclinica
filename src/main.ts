// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
import * as dotenv from 'dotenv'; // Importe o dotenv para carregar as variáveis de ambiente

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // --- MIDDLEWARES DE SEGURANÇA E PERFORMANCE ---

  // Helmet adiciona vários cabeçalhos de segurança. É uma boa prática aplicá-lo primeiro.
  // A configuração padrão do helmet é mais segura do que a personalizada com falhas.
  // A diretiva `scriptSrc: '*'` foi removida por ser uma grande falha de segurança (XSS).
  // Swagger UI pode precisar de uma configuração de CSP específica se você a mantiver.
  app.use(helmet());

  // Habilita o CORS de forma mais segura.
  // Evite usar '*' em produção. Use uma lista de origens permitidas vinda de variáveis de ambiente.
  app.enableCors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Comprime as respostas da API para melhor performance.
  app.use(compression());

  // --- CONFIGURAÇÃO GLOBAL ---

  // Pipe de validação global com uma configuração robusta.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: true, // Mantido conforme sua configuração
      skipNullProperties: true,    // Mantido conforme sua configuração
    }),
  );

  // --- CONFIGURAÇÃO DO SWAGGER (DOCUMENTAÇÃO) ---

  // Use valores padrão para evitar que a aplicação quebre se as variáveis de ambiente não existirem.
  const swaggerTitle = process.env.SWAGGER_TITLE || 'API Documentation';
  const swaggerDescription = process.env.SWAGGER_DESCRIPTION || 'The API description';
  const swaggerVersion = process.env.SWAGGER_VERSION || '1.0';
  const swaggerDocUrl = process.env.SWAGGER_DOC_URL || 'docs'; // Previne o erro 'charAt of undefined'

  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescription)
    .setVersion(swaggerVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerDocUrl, app, document);

  // --- INICIALIZAÇÃO DA APLICAÇÃO ---

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/${swaggerDocUrl}`);
}
bootstrap();