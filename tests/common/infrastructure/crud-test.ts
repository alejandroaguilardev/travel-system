import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export class CrudTest {
  static async create(
    app: INestApplication,
    access_token: string,
    route: string,
    dto: any,
  ): Promise<request.Response> {
    return await request(app.getHttpServer())
      .post(route)
      .set('Authorization', `Bearer ${access_token}`)
      .send(dto)
      .expect(201);
  }

  static async update(
    app: INestApplication,
    access_token: string,
    route: string,
    dto: any,
    dtoUpdate: any,
  ): Promise<request.Response> {
    await request(app.getHttpServer())
      .post(route)
      .set('Authorization', `Bearer ${access_token}`)
      .send(dto)
      .expect(201);

    return await request(app.getHttpServer())
      .put(`${route}/${dto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(dtoUpdate)
      .expect(200);
  }

  static async remove(
    app: INestApplication,
    access_token: string,
    route: string,
    dto: any,
  ): Promise<request.Response> {
    await request(app.getHttpServer())
      .post(route)
      .set('Authorization', `Bearer ${access_token}`)
      .send(dto)
      .expect(201);

    return await request(app.getHttpServer())
      .delete(`${route}/${dto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
  }

  static async search(
    app: INestApplication,
    access_token: string,
    route: string,
  ): Promise<request.Response> {
    return await request(app.getHttpServer())
      .get(`${route}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
  }
  static async searchById(
    app: INestApplication,
    access_token: string,
    route: string,
    dto: any,
  ): Promise<request.Response> {
    await request(app.getHttpServer())
      .post(route)
      .set('Authorization', `Bearer ${access_token}`)
      .send(dto)
      .expect(201);

    return await request(app.getHttpServer())
      .get(`${route}/${dto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
  }
}
