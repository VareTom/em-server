import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  
  // Swawgger configuration
  const config = new DocumentBuilder()
    .setTitle('`Em API')
    .setDescription('The `Em API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Cors options
  const corsOptions = {
    origin: true,
    methods: 'GET,PUT,PATCH,HEAD,DELETE,POST',
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
    'Access-Control-Allow-Headers': '*'
  };
  
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1')
  app.use(cookieParser());
  await app.listen(port);
  
  Logger.log(`Swagger documentation running on http://localhost:${port}/api`, 'Swagger');
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap().then(r => r);
