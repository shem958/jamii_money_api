import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // ✅ Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Jamii Money API')
    .setDescription('API documentation for the Jamii Money backend (NestJS + MongoDB)')
    .setVersion('1.0')
    .addBearerAuth() // 👈 Adds JWT Authorization header
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📘 Swagger Docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
