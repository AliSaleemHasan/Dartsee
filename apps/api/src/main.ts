import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Dartsee API')
    .setDescription('API for accessing Dartsee tracking data.')
    .setVersion('1.0')
    .build();

  // Cast app to any to bypass strict Typescript INestApplication union mismatches 
  // caused by monorepo peer dependencies differing minutely in the node_modules map.
  const documentFactory = () => SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup('api', app as any, documentFactory);

  await app.listen(3000);
}

void bootstrap();
