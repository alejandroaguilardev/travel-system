import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { INestApplication } from '@nestjs/common';
import { GlobalPipes } from '../../../src/common/infrastructure/config/global-pipes';
import { GlobalExceptionFilter } from '../../../src/common/infrastructure/config/global-filter';
import * as request from 'supertest';
import { UserCreatorMother } from '../domain/create-user-mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { StringMother } from '../../common/domain/string.mother';

describe('UsersController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(GlobalPipes.getGlobal());
    app.useGlobalFilters(new GlobalExceptionFilter());

    await app.init();
  });

  it('/users (POST)', async () => {
    const userDto = UserCreatorMother.create();

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userDto)
      .expect(201);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);
    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/users (GET)', async () => {
    request(app.getHttpServer()).get('/users/1').expect(200);
  });

  it('/users (PATCH)', async () => {
    const userDto = UserCreatorMother.create();
    const { id } = userDto;

    await request(app.getHttpServer()).post('/users').send(userDto).expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/users/${id}`)
      .send({ name: StringMother.create({ count: { min: 1, max: 1 } }) })
      .expect(200);

    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('/users (DELETE)', async () => {
    const userDto = UserCreatorMother.create();
    const { id } = userDto;
    await request(app.getHttpServer()).post('/users').send(userDto).expect(201);

    const response = await request(app.getHttpServer())
      .delete(`/users/${id}`)
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });
});
