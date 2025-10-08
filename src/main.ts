import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Apply global prefix
  app.setGlobalPrefix('api');

  // Global response & exception handling
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Jamii Money API')
    .setDescription('API documentation for Jamii Money backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000/api`);
  console.log(`📘 Swagger Docs: http://localhost:3000/api/docs`);
}

bootstrap();
