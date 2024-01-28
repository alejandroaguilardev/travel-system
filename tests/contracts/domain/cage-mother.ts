import { faker } from '@faker-js/faker';
import { CageDefinition } from '../../../src/contracts/domain/interfaces/cage';
import { ChosenMother } from './chosen.mother';
import { StatusMother } from './status.mother';
import { StringMother } from '../../common/domain/string.mother';

export class CageMother {
  static create(): CageDefinition {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      chosen: ChosenMother.create(),
      status: StatusMother.create(),
      swornDeclaration: true,
      recommendation: StringMother.create({ count: { min: 1, max: 1 } }),
    };
  }
}
