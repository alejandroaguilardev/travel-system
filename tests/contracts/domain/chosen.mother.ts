import { faker } from '@faker-js/faker';
import { CageChosenInterface } from '../../../src/contracts/domain/interfaces/cage.interface';
import { UuidMother } from '../../common/domain/uuid-mother';

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
