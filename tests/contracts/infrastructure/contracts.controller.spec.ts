import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { UuidMother } from '../../common/domain/uuid-mother';
import { ContractFinish } from '../../../src/contracts/application/finish/contract-finish';
import { InitTest } from '../../common/infrastructure/init-test';
import { AuthTest } from '../../common/infrastructure/auth-test';
import { CrudTest } from '../../common/infrastructure/crud-test';
import { ContractUpdater } from '../../../src/contracts/application/update/contract-updater';
import { ContractRemover } from '../../../src/contracts/application/remove/contract-remover';
import { ContractCreator } from '../../../src/contracts/application/create/contract-creator';
import { ContractFolderUpdater } from '../../../src/contracts/application/update/folder-updater';
import { UserInterface } from '../../../dist/src/users/domain/interfaces/user.interface';

const route = '/contracts';

describe('ContractsController', () => {
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

  it('/contracts (POST)', async () => {
    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });

    const response = await CrudTest.create(
      app,
      access_token,
      route,
      contractDto,
    );
    expect(response.body.message).toBe(ContractCreator.messageSuccess());
  });

  it('/contracts/:id/finish (POST)', async () => {
    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });

    await CrudTest.create(app, access_token, route, contractDto);

    const response = await request(app.getHttpServer())
      .post(`/contracts/${contractDto.id}/finish`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()
      .expect(201);

    expect(response.body.message).toBe(ContractFinish.messageSuccess());
  });

  it('/contracts (GET)', async () => {
    const response = await CrudTest.search(app, access_token, route);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/contracts:id (GET)', async () => {
    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });
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
    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });

    const contractDtoUpdate = ContractCreatorMother.create();
    contractDtoUpdate.id = contractDto.id;
    const response = await CrudTest.update(
      app,
      access_token,
      route,
      contractDto,
      contractDtoUpdate,
    );
    expect(response.body.message).toBe(ContractUpdater.messageSuccess());
  });

  it('/contracts:id/folder (Patch)', async () => {
    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });

    const { folder, number } = ContractCreatorMother.create();
    await CrudTest.create(app, access_token, route, contractDto);
    const response = await request(app.getHttpServer())
      .patch(`${route}/${contractDto.id}/folder`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({ folder, number })
      .expect(200);

    expect(response.body.message).toBe(ContractFolderUpdater.messageSuccess());
  });

  it('/contracts (DELETE)', async () => {
    const contractDto = ContractCreatorMother.create({
      client: user.id,
      adviser: user.id,
    });

    const response = await CrudTest.remove(
      app,
      access_token,
      route,
      contractDto,
    );
    expect(response.body.message).toBe(ContractRemover.messageSuccess());
  });
});
