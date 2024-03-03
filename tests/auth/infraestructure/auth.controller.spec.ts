import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { InitTest } from '../../common/infrastructure/init-test';
import { AuthTest } from '../../common/infrastructure/auth-test';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let access_token: string;

  beforeAll(async () => {
    app = await InitTest.execute();
    await app.init();
  });

  it('/auth (POST)', async () => {
    access_token = await AuthTest.execute(app);

    request(app.getHttpServer())
      .post('/auth/verify')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
  });
});
