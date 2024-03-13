import { INestApplication } from '@nestjs/common';
import { RoleMother } from '../domain/role-mother';
import { InitTest } from '../../common/infrastructure/init-test';
import { AuthTest } from '../../common/infrastructure/auth-test';
import { CrudTest } from '../../common/infrastructure/crud-test';
import { RoleUpdater } from '../../../src/roles/application/update/role-updater';
import { RoleCreator } from '../../../src/roles/application/create/role-creator';
import { RoleRemover } from '../../../src/roles/application/remove/role-remover';

const route = '/roles';

describe('RolesController', () => {
  let app: INestApplication;
  let access_token: string;

  beforeAll(async () => {
    app = await InitTest.execute();
    await app.init();
    access_token = await AuthTest.execute(app);
  });

  it('/roles (POST)', async () => {
    const roleDto = RoleMother.create();
    const response = await CrudTest.create(app, access_token, route, roleDto);
    expect(response.body.message).toBe(RoleCreator.messageSuccess());
  });

  it('/roles (GET)', async () => {
    const response = await CrudTest.search(app, access_token, route);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/roles:id (GET)', async () => {
    const roleDto = RoleMother.create();
    const response = await CrudTest.searchById(
      app,
      access_token,
      route,
      roleDto,
    );
    expect(response.body.name).toBe(roleDto.name);
  });

  it('/roles:id (PUT)', async () => {
    const roleDto = RoleMother.create();
    const roleDtoUpdate = RoleMother.create();
    const response = await CrudTest.update(
      app,
      access_token,
      route,
      roleDto,
      roleDtoUpdate,
    );
    expect(response.body.message).toBe(RoleUpdater.messageSuccess());
  });

  it('/roles (DELETE)', async () => {
    const roleDto = RoleMother.create();
    const response = await CrudTest.remove(app, access_token, route, roleDto);
    expect(response.body.message).toBe(RoleRemover.messageSuccess());
  });
});
