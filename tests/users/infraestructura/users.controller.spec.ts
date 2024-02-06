import { INestApplication } from '@nestjs/common';
import { UserCreatorMother } from '../domain/create-user-mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { InitTest, AuthTest, CrudTest } from '../../common/infrastructure';

const route = '/users';

describe('UsersController', () => {
  let app: INestApplication;
  let access_token: string;

  beforeAll(async () => {
    app = await InitTest.execute();
    await app.init();
    access_token = await AuthTest.execute(app);
  });

  it('/users (POST)', async () => {
    const userDto = UserCreatorMother.create();
    const response = await CrudTest.create(app, access_token, route, userDto);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('/users (GET)', async () => {
    const response = await CrudTest.search(app, access_token, route);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/users:id (GET)', async () => {
    const userDto = UserCreatorMother.create();
    const response = await CrudTest.searchById(
      app,
      access_token,
      route,
      userDto,
    );
    expect(response.body.email).toBe(userDto.email.toLowerCase());
  });

  it('/users:id (PUT)', async () => {
    const userDto = UserCreatorMother.create();
    const userDtoUpdate = UserCreatorMother.create();
    const response = await CrudTest.update(
      app,
      access_token,
      route,
      userDto,
      userDtoUpdate,
    );
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('/users (DELETE)', async () => {
    const userDto = UserCreatorMother.create();
    const response = await CrudTest.remove(app, access_token, route, userDto);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });
});
