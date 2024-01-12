import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { GlobalExceptionFilter } from '../../../config/global-filter';
import { globalPipes } from '../../../config/global-pipes';
import { AppModule } from '../../../src/app.module';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<any>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(globalPipes());
    app.useGlobalFilters(new GlobalExceptionFilter());

    await app.init();
    userModel = moduleFixture.get<Model<any>>(getModelToken('UserModel'));
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await app.close();
  });

  it('/auth (POST)', async () => {
    const createAuthDto = UserCreatorMother.create();

    await request(app.getHttpServer())
      .post('/users')
      .send(createAuthDto)
      .expect(201);
    const { email, password } = createAuthDto;

    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({ email, password })
      .expect(200);

    request(app.getHttpServer())
      .post('/auth/verify')
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(200);
  });
});
