import { faker } from '@faker-js/faker';
import { CageInterface } from '../../../src/contracts/domain/interfaces/cage.interface';
import { ChosenMother } from './chosen.mother';
import { StatusMother } from './status.mother';
import { StringMother } from '../../common/domain/string.mother';

export class CageMother {
  static create(): CageInterface {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      chosen: ChosenMother.create(),
      status: StatusMother.create(),
      swornDeclaration: true,
      recommendation: StringMother.create({ count: { min: 1, max: 1 } }),
    };
  }
}
