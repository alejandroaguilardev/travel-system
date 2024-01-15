import { faker } from '@faker-js/faker';
import { ContractCreateRequest } from '../../../src/contracts/application/create/contract-create-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { DateMother } from './date.mother';
import { NumberMother } from './number.mother';

export class ContractCreatorMother {
  static create(dto?: Partial<ContractCreateRequest>): ContractCreateRequest {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UuidMother.create(),
      pets: dto?.pets ?? [UuidMother.create()],
      number: NumberMother.create(),
      startDate: DateMother.recent(),
      documentation: {
        hasServiceIncluded: faker.datatype.boolean(),
      },
      cage: {
        hasServiceIncluded: faker.datatype.boolean(),
      },
      travel: {
        hasServiceIncluded: faker.datatype.boolean(),
        travelingWithPet: faker.datatype.boolean(),
      },
    };
  }
}
