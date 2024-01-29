import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalPipes } from './common/infrastructure/config/global-pipes';
import { GlobalExceptionFilter } from './common/infrastructure/config/global-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://www.app.pettravelperu.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(GlobalPipes.getGlobal());

  app.useGlobalFilters(new GlobalExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Pet travel')
    .setDescription('Pet API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env?.PORT || 5000);
}

bootstrap();
