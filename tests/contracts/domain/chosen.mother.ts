import { faker } from '@faker-js/faker';
import { CageChosen } from '../../../src/contracts/domain/interfaces/cage';

export class ChosenMother {
  static create(): CageChosen {
    return {
      dimensionsCage: faker.person.jobType(),
      modelCage: faker.person.jobType(),
      typeCage: faker.person.jobType(),
    };
  }
}
