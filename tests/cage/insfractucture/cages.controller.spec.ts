import { INestApplication } from '@nestjs/common';
import { CageMother } from '../domain/cage.mother';
import { InitTest } from '../../common/infrastructure/init-test';
import { CrudTest } from '../../common/infrastructure/crud-test';
import { AuthTest } from '../../common/infrastructure/auth-test';
import { CageRemover } from '../../../src/cages/application/remove/cage-remover';
import { CageUpdater } from '../../../src/cages/application/update/cage-updater';
import { CageCreator } from '../../../src/cages/application/create/cage-creator';

const route = '/cages';

describe('CagesController', () => {
  let app: INestApplication;
  let access_token: string;

  beforeAll(async () => {
    app = await InitTest.execute();
    await app.init();
    access_token = await AuthTest.execute(app);
  });

  it('/cages (POST)', async () => {
    const cageDto = CageMother.create();
    const response = await CrudTest.create(app, access_token, route, cageDto);
    expect(response.body.message).toBe(CageCreator.messageSuccess());
  });

  it('/cages (GET)', async () => {
    const response = await CrudTest.search(app, access_token, route);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/cages:id (GET)', async () => {
    const cageDto = CageMother.create();
    const response = await CrudTest.searchById(
      app,
      access_token,
      route,
      cageDto,
    );
    expect(response.body.modelCage).toBe(cageDto.modelCage);
  });

  it('/cages:id (PUT)', async () => {
    const cageDto = CageMother.create();
    const cageDtoUpdate = CageMother.create();
    const response = await CrudTest.update(
      app,
      access_token,
      route,
      cageDto,
      cageDtoUpdate,
    );
    expect(response.body.message).toBe(CageUpdater.messageSuccess());
  });

  it('/cages (DELETE)', async () => {
    const cageDto = CageMother.create();
    const response = await CrudTest.remove(app, access_token, route, cageDto);
    expect(response.body.message).toBe(CageRemover.messageSuccess());
  });
});
