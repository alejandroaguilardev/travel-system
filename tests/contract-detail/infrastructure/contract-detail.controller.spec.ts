import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as request from 'supertest';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
// import { UuidMother } from '../../common/domain/uuid-mother';
// import { ContractDocumentationMother } from '../domain/contract-documentation.mother';
// import { CageMother } from '../domain/cage-mother';
// import { ContractTravelMother } from '../domain/contract-travel.mother';
import { InitTest } from '../../common/infrastructure/init-test';
import { AuthTest } from '../../common/infrastructure/auth-test';
import { CrudTest } from '../../common/infrastructure/crud-test';
// import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';

const route = '/contract-detail';

describe('ContractsController', () => {
  let app: INestApplication;
  let access_token: string;
  let contractDetailModel: Model<any>;

  beforeAll(async () => {
    app = await InitTest.execute();
    contractDetailModel = app.get<Model<any>>(
      getModelToken('ContractDetailModel'),
    );
    await app.init();
    access_token = await AuthTest.execute(app);
  });

  afterAll(async () => {
    await contractDetailModel.deleteMany({});
    await app.close();
  });

  it('/contract-detail (POST)', async () => {
    const contractDto = ContractDetailCreatorMother.create();
    const response = await CrudTest.create(
      app,
      access_token,
      route,
      contractDto,
    );
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  // it('/contract-detail (GET)', async () => {
  //   const response = await CrudTest.search(app, access_token, route);

  //   expect(Array.isArray(response.body.rows)).toBe(true);
  //   expect(typeof response.body.count).toBe('number');
  // });

  // it('/contract-detail:id (GET)', async () => {
  //   const contractDto = ContractDetailCreatorMother.create();
  //   const response = await CrudTest.searchById(
  //     app,
  //     access_token,
  //     route,
  //     contractDto,
  //   );
  //   expect(response.body.pet).toBe(contractDto.pet);
  // });

  // it('/contract-detail/client/:id (GET)', async () => {
  //   const id = UuidMother.create();
  //   request(app.getHttpServer())
  //     .get(`/contract-detail/client/${id}`)
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .expect(400);
  // });

  // it('/contract-detail:id (PUT)', async () => {
  //   const contractDetail = ContractDetailCreatorMother.create();
  //   const contractDtoUpdate = ContractDetailCreatorMother.create();
  //   const response = await CrudTest.update(
  //     app,
  //     access_token,
  //     route,
  //     contractDetail,
  //     contractDtoUpdate,
  //   );
  //   expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  // });

  // it(':contractId/:contractDetailId/documentation (PATCH)', async () => {
  //   const contract = ContractCreatorMother.create();
  //   const contractDetail = ContractDetailCreatorMother.create();
  //   const documentation = ContractDocumentationMother.create();
  //   await CrudTest.create(app, access_token, route, contractDetail);

  //   const response = await request(app.getHttpServer())
  //     .patch(`/contract-detail/${contract.id}/${contractDetail.id}/documentation`)
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .send(documentation)
  //     .expect(200);

  //   expect(
  //     response.body.services.documentation.importLicense.isApplied,
  //   ).toEqual(documentation.importLicense.isApplied);
  // });

  // it(':contractId/:contractDetailId/cage (PATCH)', async () => {
  //   const contract = ContractCreatorMother.create();
  //   const contractDetail = ContractDetailCreatorMother.create();
  //   const cage = CageMother.create();
  //   await CrudTest.create(app, access_token, route, contractDetail);

  //   const response = await request(app.getHttpServer())
  //     .patch(`/contract-detail/${contract.id}/${contractDetail.id}/cage`)
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .send(cage)
  //     .expect(200);

  //   expect(response.body.contractDetail.cage.chosen.modelCage).toEqual(
  //     cage.chosen.modelCage,
  //   );
  // });

  // it(':contractId/:contractDetailId/travel (PATCH)', async () => {
  //   const contract = ContractCreatorMother.create();
  //   const contractDetail = ContractDetailCreatorMother.create();
  //   const travel = ContractTravelMother.create();
  //   await CrudTest.create(app, access_token, route, contract);

  //   const response = await request(app.getHttpServer())
  //     .patch(`/contract-detail/${contract.id}/${contractDetail.id}/travel`)
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .send(travel)
  //     .expect(200);

  //   expect(response.body.contractDetail.travel.airlineReservation.code).toEqual(
  //     travel.airlineReservation.code,
  //   );
  // });

  // it('/contract-detail (DELETE)', async () => {
  //   const contractDto = ContractDetailCreatorMother.create();
  //   const response = await CrudTest.remove(
  //     app,
  //     access_token,
  //     route,
  //     contractDto,
  //   );
  //   expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  // });
});
