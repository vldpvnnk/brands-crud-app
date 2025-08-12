import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const origin = process.env.ORIGIN || 'http://localhost';
  const NODE_ENV = process.env.NODE_ENV || 'development';

  app.enableCors({
    origin: origin,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Brands API')
    .setDescription('CRUD for Brands')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Server listening on ${port}, NODE_ENV: ${NODE_ENV}`);
}
bootstrap();
