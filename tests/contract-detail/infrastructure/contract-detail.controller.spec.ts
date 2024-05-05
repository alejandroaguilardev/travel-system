import { INestApplication } from '@nestjs/common';
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
import { DetailPetMother } from '../domain/pet.mother';
import { ContractDetailPetUpdater } from '../../../src/contract-detail/application/pet/contract-detail-pet-updater';
import { UserInterface } from '../../../src/users/domain/interfaces/user.interface';

const routeContract = '/contracts';
const routePet = '/pets';
const routeUser = '/users';

describe('ContractDetailController', () => {
  let app: INestApplication;
  let access_token: string;
  let user: UserInterface;

  beforeAll(async () => {
    app = await InitTest.execute();

    await app.init();
    const response = await AuthTest.executeWithUser(app);
    access_token = response.token;
    user = response.user;
  });

  afterAll(async () => {
    await app.close();
  });

  it(':contractId/:contractDetailId/ (GET)', async () => {
    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });

    await CrudTest.create(app, access_token, routeContract, contractDto);

    const response = await request(app.getHttpServer())
      .get(`/contract-detail/${contractDto.id}/${contractDto.details[0].id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(response.body.id).toBe(contractDto.details[0].id);
  });

  it(':contractId/pet (PATCH)', async () => {
    const petDto = PetMother.create();
    await CrudTest.create(app, access_token, routePet, petDto);
    const userDto = UserCreatorMother.create();
    await CrudTest.create(app, access_token, routeUser, userDto);

    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });

    contractDto.details[0].pet = petDto.id;
    contractDto.client = userDto.id;

    await CrudTest.create(app, access_token, routeContract, contractDto);

    const petRequest = DetailPetMother.create({
      details: [{ id: contractDto.details[0].id, pet: petDto.id }],
    });

    const response = await request(app.getHttpServer())
      .patch(`/contract-detail/${contractDto.id}/pet`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(petRequest)
      .expect(200);

    expect(response.body.message).toEqual(
      ContractDetailPetUpdater.messageSuccess(),
    );
  });

  it(':contractId/:contractDetailId/documentation (PATCH)', async () => {
    const petDto = PetMother.create();
    await CrudTest.create(app, access_token, routePet, petDto);
    const userDto = UserCreatorMother.create();
    await CrudTest.create(app, access_token, routeUser, userDto);

    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });

    contractDto.details[0].pet = petDto.id;
    contractDto.client = userDto.id;

    await CrudTest.create(app, access_token, routeContract, contractDto);

    const documentation = ContractDocumentationMother.create();

    await request(app.getHttpServer())
      .patch(
        `/contract-detail/${contractDto.id}/${contractDto.details[0].id}/documentation`,
      )
      .set('Authorization', `Bearer ${access_token}`)
      .send(documentation)
      .expect(200);
  });

  it(':contractId/:contractDetailId/cage (PATCH)', async () => {
    const petDto = PetMother.create();
    await CrudTest.create(app, access_token, routePet, petDto);
    const userDto = UserCreatorMother.create();
    await CrudTest.create(app, access_token, routeUser, userDto);

    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });

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

    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });

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
});
