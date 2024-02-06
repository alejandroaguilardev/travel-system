import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GlobalPipes } from '../../../src/common/infrastructure/config/global-pipes';
import { AppModule } from '../../../src/app.module';
import { GlobalExceptionFilter } from '../../../src/common/infrastructure/config/global-filter';

export class InitTest {
  static async execute(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(GlobalPipes.getGlobal());
    app.useGlobalFilters(new GlobalExceptionFilter());

    return app;
  }
}
