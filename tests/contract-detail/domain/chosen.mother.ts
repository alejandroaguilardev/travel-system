import { faker } from '@faker-js/faker';
import { UuidMother } from '../../common/domain/uuid-mother';
import { CageChosenInterface } from '../../../src/contract-detail/domain/interfaces';

export class ChosenMother {
  static create(): CageChosenInterface {
    return {
      dimensionsCage: faker.person.jobType(),
      modelCage: faker.person.jobType(),
      typeCage: faker.person.jobType(),
      user: UuidMother.create(),
    };
  }
}
