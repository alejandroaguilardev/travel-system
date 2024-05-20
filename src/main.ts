import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalPipes } from './common/infrastructure/config/global-pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(GlobalPipes.getGlobal());

  const options = new DocumentBuilder()
    .setTitle('Pet travel')
    .setDescription('Pet API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  process.env.TZ = process.env.TIMEZONE || process.env.TZ;
  await app.listen(process.env?.PORT || 5000);
}

bootstrap();
