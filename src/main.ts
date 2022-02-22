import { NestFactory } from '@nestjs/core';
import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function getLogLevels(isProduction: boolean): LogLevel[] {
  if (isProduction) return ['log', 'warn', 'error'];
  return ['error', 'warn', 'log', 'verbose', 'debug'];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production')
  });
  const port = process.env.PORT;
  
  // Swagger configuration
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
    "Access-Control-Allow-Headers": "*",
  };
  
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.enableCors(corsOptions);
  await app.listen(port);
  
  Logger.log(`Swagger documentation running on http://localhost:${port}/api`, 'Swagger');
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap().then(r => r);
