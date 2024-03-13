import { INestApplication } from '@nestjs/common';
import { PermissionMother } from '../domain/permission.mother';
import { InitTest } from '../../common/infrastructure/init-test';
import { AuthTest } from '../../common/infrastructure/auth-test';
import { CrudTest } from '../../common/infrastructure/crud-test';
import { PermissionCreator } from '../../../src/permissions/application/create/permission-creator';
import { PermissionUpdater } from '../../../src/permissions/application/updated/permission-updater';
import { PermissionRemover } from '../../../src/permissions/application/remove/permission-remover';

const route = '/permissions';

describe('PermissionsController', () => {
  let app: INestApplication;
  let access_token: string;

  beforeAll(async () => {
    app = await InitTest.execute();
    await app.init();
    access_token = await AuthTest.execute(app);
  });

  it('/permissions (POST)', async () => {
    const permissionDto = PermissionMother.create();
    const response = await CrudTest.create(
      app,
      access_token,
      route,
      permissionDto,
    );
    expect(response.body.message).toBe(PermissionCreator.messageSuccess());
  });

  it('/permissions (GET)', async () => {
    const response = await CrudTest.search(app, access_token, route);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/permissions:id (GET)', async () => {
    const permissionDto = PermissionMother.create();
    const response = await CrudTest.searchById(
      app,
      access_token,
      route,
      permissionDto,
    );
    expect(response.body.name).toBe(permissionDto.name.toLowerCase());
  });

  it('/permissions:id (PUT)', async () => {
    const permissionDto = PermissionMother.create();
    const permissionDtoUpdate = PermissionMother.create();
    const response = await CrudTest.update(
      app,
      access_token,
      route,
      permissionDto,
      permissionDtoUpdate,
    );
    expect(response.body.message).toBe(PermissionUpdater.messageSuccess());
  });

  it('/permissions (DELETE)', async () => {
    const permissionDto = PermissionMother.create();
    const response = await CrudTest.remove(
      app,
      access_token,
      route,
      permissionDto,
    );
    expect(response.body.message).toBe(PermissionRemover.messageSuccess());
  });
});
