import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const urls = process.env.URLS.split(',').map((url: string) => url.trim());
  const methods = process.env.METHODS.split(',').map((url: string) =>
    url.trim(),
  );

  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: true,
      skipNullProperties: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: false,
    optionsSuccessStatus: 204,
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", '*'],
        },
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.SWAGGER_VERSION)
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_DOC_URL, app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();