import { INestApplication } from '@nestjs/common';
import { PetMother } from '../domain/pet.mother';
import { InitTest } from '../../common/infrastructure/init-test';
import { AuthTest } from '../../common/infrastructure/auth-test';
import { CrudTest } from '../../common/infrastructure/crud-test';
import { PetCreator } from '../../../src/pets/application/create/pet-creator';
import { PetUpdater } from '../../../src/pets/application/update/pet-updater';
import { PetRemover } from '../../../src/pets/application/remove/pet-remover';

const route = '/pets';

describe('PetsController', () => {
  let app: INestApplication;
  let access_token: string;

  beforeAll(async () => {
    app = await InitTest.execute();
    await app.init();
    access_token = await AuthTest.execute(app);
  });

  it('/pets (POST)', async () => {
    const petDto = PetMother.create();
    const response = await CrudTest.create(app, access_token, route, petDto);
    expect(response.body.message).toBe(PetCreator.messageSuccess());
  });

  it('/pets (GET)', async () => {
    const response = await CrudTest.search(app, access_token, route);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/pets:id (GET)', async () => {
    const petDto = PetMother.create();
    const response = await CrudTest.searchById(
      app,
      access_token,
      route,
      petDto,
    );
    expect(response.body.name).toBe(petDto.name);
  });

  it('/pets:id (PUT)', async () => {
    const petDto = PetMother.create();
    const petDtoUpdate = PetMother.create();
    const response = await CrudTest.update(
      app,
      access_token,
      route,
      petDto,
      petDtoUpdate,
    );
    expect(response.body.message).toBe(PetUpdater.messageSuccess());
  });

  it('/pets (DELETE)', async () => {
    const petDto = PetMother.create();
    const response = await CrudTest.remove(app, access_token, route, petDto);
    expect(response.body.message).toBe(PetRemover.messageSuccess());
  });
});
