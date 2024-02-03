import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { GlobalExceptionFilter } from '../../../src/common/infrastructure/config/global-filter';
import { GlobalPipes } from '../../../src/common/infrastructure/config/global-pipes';
import { AppModule } from '../../../src/app.module';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { UuidMother } from '../../common/domain/uuid-mother';
import { ContractFinish } from '../../../src/contracts/application/finish/contract-finish';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { ContractDocumentationMother } from '../domain/contract-documentation.mother';
import { CageMother } from '../domain/cage-mother';
import { ContractTravelMother } from '../domain/contract-travel.mother';

describe('ContractsController', () => {
  let app: INestApplication;
  let contractModel: Model<any>;
  let access_token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(GlobalPipes.getGlobal());
    app.useGlobalFilters(new GlobalExceptionFilter());

    await app.init();
    contractModel = moduleFixture.get<Model<any>>(
      getModelToken('ContractModel'),
    );

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
    await contractModel.deleteMany({});
    await app.close();
  });

  it('/contracts (POST)', async () => {
    const contractDto = ContractCreatorMother.create();
    const response = await request(app.getHttpServer())
      .post('/contracts')
      .set('Authorization', `Bearer ${access_token}`)
      .send(contractDto)
      .expect(201);

    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('/contracts/:id/finish (POST)', async () => {
    const contractDto = ContractCreatorMother.create();

    await request(app.getHttpServer())
      .post('/contracts')
      .set('Authorization', `Bearer ${access_token}`)
      .send(contractDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .post(`/contracts/${contractDto.id}/finish`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()
      .expect(400);

    expect(response.body.message).toBe(ContractFinish.messageNotCompleted());
  });

  it('/contracts (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/contracts')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/contracts/:id (GET)', async () => {
    const id = UuidMother.create();
    request(app.getHttpServer())
      .get(`/contracts/${id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(400);
  });

  it('/contracts/client/:id (GET)', async () => {
    const id = UuidMother.create();
    request(app.getHttpServer())
      .get(`/contracts/client/${id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(400);
  });

  it('/contracts (PATCH)', async () => {
    const contractDto = ContractCreatorMother.create();

    const updateContractDto = ContractCreatorMother.create();

    await request(app.getHttpServer())
      .post('/contracts')
      .set('Authorization', `Bearer ${access_token}`)
      .send(contractDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/contracts/${contractDto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateContractDto)
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it(':id/documentation (PATCH)', async () => {
    const dto = ContractCreatorMother.create();
    const documentation = ContractDocumentationMother.create();

    await request(app.getHttpServer())
      .post('/contracts')
      .set('Authorization', `Bearer ${access_token}`)
      .send(dto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/contracts/${dto.id}/documentation`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(documentation)
      .expect(200);

    expect(
      response.body.services.documentation.importLicense.isApplied,
    ).toEqual(documentation.importLicense.isApplied);
  });

  it(':id/cage (PATCH)', async () => {
    const dto = ContractCreatorMother.create();
    const cage = CageMother.create();

    await request(app.getHttpServer())
      .post('/contracts')
      .set('Authorization', `Bearer ${access_token}`)
      .send(dto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/contracts/${dto.id}/cage`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(cage)
      .expect(200);

    expect(response.body.services.cage.chosen.modelCage).toEqual(
      cage.chosen.modelCage,
    );
  });

  it(':id/travel (PATCH)', async () => {
    const dto = ContractCreatorMother.create();
    const travel = ContractTravelMother.create();

    await request(app.getHttpServer())
      .post('/contracts')
      .set('Authorization', `Bearer ${access_token}`)
      .send(dto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/contracts/${dto.id}/travel`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(travel)
      .expect(200);

    expect(response.body.services.travel.airlineReservation.code).toEqual(
      travel.airlineReservation.code,
    );
  });

  it('/contracts (DELETE)', async () => {
    const contractDto = ContractCreatorMother.create();
    await request(app.getHttpServer())
      .post('/contracts')
      .set('Authorization', `Bearer ${access_token}`)
      .send(contractDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .delete(`/contracts/${contractDto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });
});
