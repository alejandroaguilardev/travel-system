import { INestApplication } from '@nestjs/common';
import { CageMother } from '../domain/cage.mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { InitTest } from '../../common/infrastructure/init-test';
import { CrudTest } from '../../common/infrastructure/crud-test';
import { AuthTest } from '../../common/infrastructure/auth-test';

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
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
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
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('/cages (DELETE)', async () => {
    const cageDto = CageMother.create();
    const response = await CrudTest.remove(app, access_token, route, cageDto);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });
});
