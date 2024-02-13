import { faker } from '@faker-js/faker';
import { CageInterface } from '../../../src/contracts/domain/interfaces/cage.interface';
import { ChosenMother } from './chosen.mother';
import { StringMother } from '../../common/domain/string.mother';
import { StatusMother } from '../../contracts/domain/status.mother';

export class CageMother {
  static create(): CageInterface {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      chosen: ChosenMother.create(),
      status: StatusMother.create(),
      recommendation: StringMother.create({ count: { min: 1, max: 1 } }),
    };
  }
}
