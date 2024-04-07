import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserInterface } from '../../../src/users/domain/interfaces/user.interface';

export class AuthTest {
  static async execute(app: INestApplication): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'alex@gmail.com', password: '12345678' })
      .expect(200);
    return response.body.token;
  }

  static async executeWithUser(
    app: INestApplication,
  ): Promise<{ token: string; user: UserInterface }> {
    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'alex@gmail.com', password: '12345678' })
      .expect(200);

    return {
      token: response.body.token,
      user: response.body.user,
    };
  }
}
