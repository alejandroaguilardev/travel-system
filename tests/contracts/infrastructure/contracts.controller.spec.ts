import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { UuidMother } from '../../common/domain/uuid-mother';
import { ContractFinish } from '../../../src/contracts/application/finish/contract-finish';
import { ContractDocumentationMother } from '../domain/contract-documentation.mother';
import { CageMother } from '../domain/cage-mother';
import { ContractTravelMother } from '../domain/contract-travel.mother';
import { InitTest } from '../../common/infrastructure/init-test';
import { AuthTest } from '../../common/infrastructure/auth-test';
import { CrudTest } from '../../common/infrastructure/crud-test';

const route = '/contracts';

describe('ContractsController', () => {
  let app: INestApplication;
  let access_token: string;
  let contractModel: Model<any>;

  beforeAll(async () => {
    app = await InitTest.execute();
    contractModel = app.get<Model<any>>(getModelToken('ContractModel'));
    await app.init();
    access_token = await AuthTest.execute(app);
  });

  afterAll(async () => {
    await contractModel.deleteMany({});
    await app.close();
  });

  it('/contracts (POST)', async () => {
    const contractDto = ContractCreatorMother.create();
    const response = await CrudTest.create(
      app,
      access_token,
      route,
      contractDto,
    );
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('/contracts/:id/finish (POST)', async () => {
    const contractDto = ContractCreatorMother.create();
    await CrudTest.create(app, access_token, route, contractDto);

    const response = await request(app.getHttpServer())
      .post(`/contracts/${contractDto.id}/finish`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()
      .expect(400);

    expect(response.body.message).toBe(ContractFinish.messageNotCompleted());
  });

  it('/contracts (GET)', async () => {
    const response = await CrudTest.search(app, access_token, route);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/contracts:id (GET)', async () => {
    const contractDto = ContractCreatorMother.create();
    const response = await CrudTest.searchById(
      app,
      access_token,
      route,
      contractDto,
    );
    expect(response.body.number).toBe(contractDto.number);
  });

  it('/contracts/client/:id (GET)', async () => {
    const id = UuidMother.create();
    request(app.getHttpServer())
      .get(`/contracts/client/${id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(400);
  });

  it('/contracts:id (PUT)', async () => {
    const contractDto = ContractCreatorMother.create();
    const contractDtoUpdate = ContractCreatorMother.create();
    const response = await CrudTest.update(
      app,
      access_token,
      route,
      contractDto,
      contractDtoUpdate,
    );
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it(':id/documentation (PATCH)', async () => {
    const dto = ContractCreatorMother.create();
    const documentation = ContractDocumentationMother.create();
    await CrudTest.create(app, access_token, route, dto);

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
    await CrudTest.create(app, access_token, route, dto);

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
    await CrudTest.create(app, access_token, route, dto);

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
    const response = await CrudTest.remove(
      app,
      access_token,
      route,
      contractDto,
    );
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });
});
