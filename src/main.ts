import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import welcome from './common/domain/static/welcome';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.use(helmet());
  app.setGlobalPrefix('api');

  /***
   * @Documentation API
   */
  if (process.env.NODE_ENV !== 'production') {
    app.getHttpAdapter().get('/', (_, res) => res.send(welcome));
    const options = new DocumentBuilder()
      .setTitle('Pet travel')
      .setDescription(
        'At *Pet Travel Perú*, we are a team of professionals and veterinarians committed to your peace of mind and satisfaction. Since 2008, we have been helping to mobilize over ten thousand pets worldwide, to destinations such as the United States, European Union, Asia, Africa, and all of Latin America.',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  process.env.TZ = process.env.TIMEZONE || process.env.TZ;
  await app.listen(process.env?.PORT || 5000);
}

bootstrap();
