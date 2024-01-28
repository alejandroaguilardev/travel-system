import { NestFactory } from '@nestjs/core';
import { swaggerConfig } from 'config/swagger';
import { AppModule } from './app.module';
import { globalPipes } from 'config/global-pipes';
import { GlobalExceptionFilter } from 'config/global-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(globalPipes());

  app.useGlobalFilters(new GlobalExceptionFilter());

  swaggerConfig(app);

  await app.listen(process.env?.PORT || 5000);
}

bootstrap();
