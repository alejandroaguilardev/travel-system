import { faker } from '@faker-js/faker';
import { CreateCageRequest } from '../../../src/cages/application/create/create-cage-request';
import { UuidMother } from '../../common/domain/uuid-mother';

export class CageMother {
  static create(cage?: Partial<CreateCageRequest>): CreateCageRequest {
    return {
      id: cage?.id ?? UuidMother.create(),
      typeCage: cage?.typeCage ?? faker.person.jobType(),
      modelCage: cage?.modelCage ?? faker.person.jobType(),
      dimensionsCage: cage?.dimensionsCage ?? faker.person.jobType(),
    };
  }
}
