import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { GlobalPipes } from '../../../src/common/infrastructure/config/global-pipes';
import { GlobalExceptionFilter } from '../../../src/common/infrastructure/config/global-filter';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { PetMother } from '../domain/pet.mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

describe('PetsController', () => {
  let app: INestApplication;
  let petModel: Model<any>;
  let access_token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(GlobalPipes.getGlobal());
    app.useGlobalFilters(new GlobalExceptionFilter());

    await app.init();

    petModel = moduleFixture.get<Model<any>>(getModelToken('PetModel'));

    const createAuthDto = UserCreatorMother.create();
    await request(app.getHttpServer())
      .post('/users')
      .send(createAuthDto)
      .expect(201);
    const { email, password } = createAuthDto;

    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({ email, password })
      .expect(200);

    access_token = response.body.token;
  });

  afterAll(async () => {
    await petModel.deleteMany({});
    await app.close();
  });

  it('/pets (POST)', async () => {
    const petDto = PetMother.create();
    const response = await request(app.getHttpServer())
      .post('/pets')
      .set('Authorization', `Bearer ${access_token}`)
      .send(petDto)
      .expect(201);

    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('/pets (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/pets')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(typeof response.body.count).toBe('number');
  });

  it('/pets/:id (GET)', async () => {
    const petDto = PetMother.create();
    await request(app.getHttpServer())
      .post('/pets')
      .set('Authorization', `Bearer ${access_token}`)
      .send(petDto)
      .expect(201);

    request(app.getHttpServer())
      .get(`/pets/${petDto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
  });

  it('/pets (PATCH)', async () => {
    const petDto = PetMother.create();

    const updateContractDto = PetMother.create();

    await request(app.getHttpServer())
      .post('/pets')
      .set('Authorization', `Bearer ${access_token}`)
      .send(petDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/pets/${petDto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateContractDto)
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('/pets (DELETE)', async () => {
    const petDto = PetMother.create();
    await request(app.getHttpServer())
      .post('/pets')
      .set('Authorization', `Bearer ${access_token}`)
      .send(petDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .delete(`/pets/${petDto.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
    expect(response.body.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });
});
