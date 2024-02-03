import { faker } from '@faker-js/faker';
import { CageChosenInterface } from '../../../src/contracts/domain/interfaces/cage.interface';

export class ChosenMother {
  static create(): CageChosenInterface {
    return {
      dimensionsCage: faker.person.jobType(),
      modelCage: faker.person.jobType(),
      typeCage: faker.person.jobType(),
    };
  }
}
