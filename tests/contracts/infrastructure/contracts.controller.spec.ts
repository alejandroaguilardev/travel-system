import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { GlobalExceptionFilter } from '../../../config/global-filter';
import { globalPipes } from '../../../config/global-pipes';
import { AppModule } from '../../../src/app.module';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { UuidMother } from '../../common/domain/uuid-mother';
import { NumberMother } from '../domain/number.mother';

describe('ContractsController', () => {
  let app: INestApplication;
  let contractModel: Model<any>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(globalPipes());
    app.useGlobalFilters(new GlobalExceptionFilter());

    await app.init();
    contractModel = moduleFixture.get<Model<any>>(
      getModelToken('ContractModel'),
    );
  });

  afterAll(async () => {
    await contractModel.deleteMany({});
    await app.close();
  });

  it('/contracts (POST)', async () => {
    const contractDto = ContractCreatorMother.create();

    const response = await request(app.getHttpServer())
      .post('/contracts')
      .send(contractDto)
      .expect(201);

    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('/contracts (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/contracts')
      .expect(200);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/contracts/:id (GET)', async () => {
    const id = UuidMother.create();
    request(app.getHttpServer()).get(`/permissions/${id}`).expect(400);
  });

  it('/contracts (PATCH)', async () => {
    const userDto = ContractCreatorMother.create();
    const { id } = userDto;

    await request(app.getHttpServer())
      .post('/contracts')
      .send(userDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/contracts/${id}`)
      .send({ number: NumberMother.create() })
      .expect(200);

    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('/contracts (DELETE)', async () => {
    const dto = ContractCreatorMother.create();
    const { id } = dto;
    await request(app.getHttpServer()).post('/contracts').send(dto).expect(201);

    const response = await request(app.getHttpServer())
      .delete(`/contracts/${id}`)
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });
});
