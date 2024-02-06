import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export class AuthTest {
  static async execute(app: INestApplication): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'alex@gmail.com', password: '12345678' })
      .expect(200);
    return response.body.token;
  }
}
