import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { globalPipes } from '../../../config/global-pipes';
import { AppModule } from '../../../src/app.module';
import { GlobalExceptionFilter } from '../../../config/global-filter';
import { PermissionMother } from '../domain/permission.mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { PermissionNameMother } from '../domain/permission-name.mother';

describe('PermissionsController', () => {
  let app: INestApplication;
  let permissionsModel: Model<any>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(globalPipes());
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();

    permissionsModel = moduleFixture.get<Model<any>>(
      getModelToken('PermissionModel'),
    );
  });

  afterAll(async () => {
    permissionsModel.deleteMany({});
    await app.close();
  });

  it('/permissions (POST)', async () => {
    const dto = PermissionMother.create();
    const response = await request(app.getHttpServer())
      .post('/permissions')
      .send(dto)
      .expect(201);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('/permissions (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/permissions')
      .expect(200);
    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/permissions/:id (GET)', async () => {
    const dto = PermissionMother.create();
    request(app.getHttpServer()).get(`/permissions/${dto.id}`).expect(400);
  });

  it('/permissions:id (PATCH)', async () => {
    const dto = PermissionMother.create();
    const name = PermissionNameMother.create();

    await request(app.getHttpServer())
      .post('/permissions')
      .send(dto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/permissions/${dto.id}`)
      .send({ name })
      .expect(200);

    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('/permissions:id (DELETE)', async () => {
    const dto = PermissionMother.create();
    const name = PermissionNameMother.create();
    const response = await request(app.getHttpServer())
      .delete(`/permissions/${dto.id}`)
      .send({ name })
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });
});
