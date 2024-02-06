import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { GlobalPipes } from '../../../src/common/infrastructure/config/global-pipes';
import { GlobalExceptionFilter } from '../../../src/common/infrastructure/config/global-filter';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CageMother } from '../domain/cage.mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

describe('CagesController', () => {
  let app: INestApplication;
  let cageModel: Model<any>;
  let access_token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(GlobalPipes.getGlobal());
    app.useGlobalFilters(new GlobalExceptionFilter());

    await app.init();

    cageModel = moduleFixture.get<Model<any>>(getModelToken('CageModel'));

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

    access_token = response.body.token;
  });

  afterAll(async () => {
    await cageModel.deleteMany({});
    await app.close();
  });

  it('/cages (POST)', async () => {
    const cageDto = CageMother.create();
    const response = await request(app.getHttpServer())
      .post('/cages')
      .set('Authorization', `Bearer ${access_token}`)
      .send(cageDto)
      .expect(201);

    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('/cages (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/cages')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/cages/:id (GET)', async () => {
    const cageDto = CageMother.create();
    await request(app.getHttpServer())
      .post('/cages')
      .set('Authorization', `Bearer ${access_token}`)
      .send(cageDto)
      .expect(201);

    request(app.getHttpServer())
      .get(`/cages/${cageDto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
  });

  it('/cages (PATCH)', async () => {
    const cageDto = CageMother.create();

    const updateContractDto = CageMother.create();

    await request(app.getHttpServer())
      .post('/cages')
      .set('Authorization', `Bearer ${access_token}`)
      .send(cageDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/cages/${cageDto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateContractDto)
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('/cages (DELETE)', async () => {
    const cageDto = CageMother.create();
    await request(app.getHttpServer())
      .post('/cages')
      .set('Authorization', `Bearer ${access_token}`)
      .send(cageDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .delete(`/cages/${cageDto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });
});
