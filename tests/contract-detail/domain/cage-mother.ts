import { faker } from '@faker-js/faker';
import { ChosenMother } from './chosen.mother';
import { StatusMother } from '../../contracts/domain/status.mother';
import { CageInterface } from '../../../src/contract-detail/domain/interfaces';

export class CageMother {
  static create(): CageInterface {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      chosen: ChosenMother.create(),
      status: StatusMother.create(),
      recommendation: ChosenMother.create(),
    };
  }
}
