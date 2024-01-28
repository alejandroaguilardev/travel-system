import { faker } from '@faker-js/faker';
import { ContractCreateRequest } from '../../../src/contracts/application/create/contract-create-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { DateMother } from './date.mother';
import { NumberMother } from './number.mother';
import { StringMother } from '../../common/domain/string.mother';
import { ChosenMother } from './chosen.mother';
import { TypeTravelingMother } from './type-traveling-mother';
import { StatusMother } from './status.mother';
import { ContractDocumentationMother } from './contract-documentation.mother';

export class ContractCreatorMother {
  static create(dto?: Partial<ContractCreateRequest>): ContractCreateRequest {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UuidMother.create(),
      pets: dto?.pets ?? [UuidMother.create()],
      number: NumberMother.create(),
      startDate: DateMother.recent(),
      documentation: ContractDocumentationMother.create(),
      cage: {
        hasServiceIncluded: faker.datatype.boolean(),
        chosen: ChosenMother.create(),
        status: StatusMother.create(),
        swornDeclaration: faker.datatype.boolean(),
        recommendation: StringMother.create({ count: { min: 1, max: 1 } }),
      },
      travel: {
        hasServiceIncluded: faker.datatype.boolean(),
        typeTraveling: TypeTravelingMother.create(),
      },
    };
  }
}
