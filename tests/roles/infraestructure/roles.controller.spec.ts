import { INestApplication } from '@nestjs/common';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { GlobalExceptionFilter } from '../../../config/global-filter';
import { globalPipes } from '../../../config/global-pipes';
import { AppModule } from '../../../src/app.module';
import { RoleMother } from '../domain/role-mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { getModelToken } from '@nestjs/mongoose';
import { RoleNameMother } from '../domain/role-name.mother';

describe('RolesController', () => {
  let app: INestApplication;
  let roleModel: Model<any>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(globalPipes());
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();
    roleModel = moduleFixture.get<Model<any>>(getModelToken('RoleModel'));
  });

  afterAll(async () => {
    await roleModel.deleteMany({});
    await app.close();
  });

  it('/roles (POST)', async () => {
    const dto = RoleMother.create();
    const response = await request(app.getHttpServer())
      .post('/roles')
      .send(dto)
      .expect(201);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('/roles/:id (GET)', async () => {
    const dto = RoleMother.create();
    request(app.getHttpServer()).get(`/permissions/${dto.id}`).expect(400);
  });

  it('/roles (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/roles')
      .expect(200);
    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/roles (PATCH)', async () => {
    const dto = RoleMother.create();
    const name = RoleNameMother.create();

    await request(app.getHttpServer()).post('/roles').send(dto).expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/roles/${dto.id}`)
      .send({ name })
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('/roles (DELETE)', async () => {
    const dto = RoleMother.create();
    const name = RoleNameMother.create();
    const response = await request(app.getHttpServer())
      .delete(`/permissions/${dto.id}`)
      .send({ name })
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });
});
