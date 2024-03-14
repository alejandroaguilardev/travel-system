import { INestApplication } from '@nestjs/common';
import { FolderMother } from '../domain/folder.mother';
import { InitTest } from '../../common/infrastructure/init-test';
import { CrudTest } from '../../common/infrastructure/crud-test';
import { AuthTest } from '../../common/infrastructure/auth-test';
import { FolderRemover } from '../../../src/folders/application/remove/folder-remover';
import { FolderUpdater } from '../../../src/folders/application/update/folder-updater';
import { FolderCreator } from '../../../src/folders/application/create/folder-creator';

const route = '/folders';

describe('FoldersController', () => {
  let app: INestApplication;
  let access_token: string;

  beforeAll(async () => {
    app = await InitTest.execute();
    await app.init();
    access_token = await AuthTest.execute(app);
  });

  it('/folders (POST)', async () => {
    const folderDto = FolderMother.create();
    const response = await CrudTest.create(app, access_token, route, folderDto);
    expect(response.body.message).toBe(FolderCreator.messageSuccess());
  });

  it('/folders (GET)', async () => {
    const response = await CrudTest.search(app, access_token, route);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/folders:id (GET)', async () => {
    const folderDto = FolderMother.create();
    const response = await CrudTest.searchById(
      app,
      access_token,
      route,
      folderDto,
    );
    expect(response.body.name).toBe(folderDto.name);
  });

  it('/folders:id (PUT)', async () => {
    const folderDto = FolderMother.create();
    const folderDtoUpdate = FolderMother.create();
    const response = await CrudTest.update(
      app,
      access_token,
      route,
      folderDto,
      folderDtoUpdate,
    );
    expect(response.body.message).toBe(FolderUpdater.messageSuccess());
  });

  it('/folders (DELETE)', async () => {
    const folderDto = FolderMother.create();
    const response = await CrudTest.remove(app, access_token, route, folderDto);
    expect(response.body.message).toBe(FolderRemover.messageSuccess());
  });
});
