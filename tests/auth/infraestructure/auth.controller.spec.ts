import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { InitTest } from '../../common/infrastructure/init-test';
import { AuthTest } from '../../common/infrastructure/auth-test';
import { CrudTest } from '../../common/infrastructure/crud-test';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let access_token: string;

  beforeAll(async () => {
    app = await InitTest.execute();
    await app.init();
    access_token = await AuthTest.execute(app);
  });

  it('/auth (POST)', async () => {
    const createAuthDto = UserCreatorMother.create();
    const { email } = createAuthDto;
    const password = '12345678';

    await CrudTest.create(app, access_token, '/users', createAuthDto);

    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({ email, password })
      .expect(200);

    request(app.getHttpServer())
      .post('/auth/verify')
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(200);
  });
});
