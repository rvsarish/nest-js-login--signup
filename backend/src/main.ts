import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors'; // Import cors module
import { CorsOptions } from 'cors';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:8100', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
  };
  app.use(cors(corsOptions));

  // Configure Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Nest Postgres Auth API')
    .setDescription('API documentation for NestJS with PostgreSQL Authentication')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
