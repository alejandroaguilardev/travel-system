import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { ContractDocumentationMother } from '../domain/contract-documentation.mother';
import { InitTest } from '../../common/infrastructure/init-test';
import { AuthTest } from '../../common/infrastructure/auth-test';
import { CrudTest } from '../../common/infrastructure/crud-test';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';
import { PetMother } from '../../pet/domain/pet.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CageMother } from '../domain/cage-mother';
import { ContractTravelMother } from '../domain/contract-travel.mother';
import { ContractDetailRemover } from '../../../src/contract-detail/application/remove/contract-detail-remover';

const route = '/contract-detail';
const routeContract = '/contracts';
const routePet = '/pets';
const routeUser = '/users';

describe('ContractDetailController', () => {
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

  it('/contract-detail (GET)', async () => {
    const response = await CrudTest.search(app, access_token, routeContract);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it(':contractId/:contractDetailId/ (GET)', async () => {
    const contractDto = ContractCreatorMother.create();
    await CrudTest.create(app, access_token, routeContract, contractDto);

    const response = await request(app.getHttpServer())
      .get(`/contract-detail/${contractDto.id}/${contractDto.details[0].id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(response.body.id).toBe(contractDto.details[0].id);
  });

  it(':contractId/:contractDetailId/documentation (PATCH)', async () => {
    const petDto = PetMother.create();
    await CrudTest.create(app, access_token, routePet, petDto);
    const userDto = UserCreatorMother.create();
    await CrudTest.create(app, access_token, routeUser, userDto);

    const contractDto = ContractCreatorMother.create();
    contractDto.details[0].pet = petDto.id;
    contractDto.client = userDto.id;

    await CrudTest.create(app, access_token, routeContract, contractDto);

    const documentation = ContractDocumentationMother.create();

    const response = await request(app.getHttpServer())
      .patch(
        `/contract-detail/${contractDto.id}/${contractDto.details[0].id}/documentation`,
      )
      .set('Authorization', `Bearer ${access_token}`)
      .send(documentation)
      .expect(200);

    expect(
      response.body.contractDetail.documentation.importLicense.isApplied,
    ).toEqual(documentation.importLicense.isApplied);
  });

  it(':contractId/:contractDetailId/cage (PATCH)', async () => {
    const petDto = PetMother.create();
    await CrudTest.create(app, access_token, routePet, petDto);
    const userDto = UserCreatorMother.create();
    await CrudTest.create(app, access_token, routeUser, userDto);

    const contractDto = ContractCreatorMother.create();
    contractDto.details[0].pet = petDto.id;
    contractDto.client = userDto.id;

    await CrudTest.create(app, access_token, routeContract, contractDto);

    const cage = CageMother.create();

    const response = await request(app.getHttpServer())
      .patch(
        `/contract-detail/${contractDto.id}/${contractDto.details[0].id}/cage`,
      )
      .set('Authorization', `Bearer ${access_token}`)
      .send(cage)
      .expect(200);

    expect(response.body.contractDetail.cage.chosen.modelCage).toEqual(
      cage.chosen.modelCage,
    );
  });

  it(':id/:detail/travel (PATCH)', async () => {
    const petDto = PetMother.create();
    await CrudTest.create(app, access_token, routePet, petDto);
    const userDto = UserCreatorMother.create();
    await CrudTest.create(app, access_token, routeUser, userDto);

    const contractDto = ContractCreatorMother.create();
    contractDto.details[0].pet = petDto.id;
    contractDto.client = userDto.id;

    await CrudTest.create(app, access_token, routeContract, contractDto);

    const travel = ContractTravelMother.create();

    const response = await request(app.getHttpServer())
      .patch(
        `/contract-detail/${contractDto.id}/${contractDto.details[0].id}/travel`,
      )
      .set('Authorization', `Bearer ${access_token}`)
      .send(travel)
      .expect(200);

    expect(response.body.contractDetail.travel.airlineReservation.code).toEqual(
      travel.airlineReservation.code,
    );
  });

  it('/contract-detail (DELETE)', async () => {
    const contractDto = ContractCreatorMother.create();
    await CrudTest.create(app, access_token, routeContract, contractDto);

    const response = await request(app.getHttpServer())
      .delete(`${route}/${contractDto.details[0].id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(response.body.message).toBe(ContractDetailRemover.messageSuccess());
  });
});
