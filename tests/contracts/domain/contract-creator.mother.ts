import { faker } from '@faker-js/faker';
import { ContractCreateRequest } from '../../../src/contracts/application/create/contract-create-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { DateMother } from '../../common/domain/date.mother';
import { NumberMother } from '../../common/domain/number.mother';
import { TypeTravelingMother } from './type-traveling-mother';
import { ContractDocumentationMother } from './contract-documentation.mother';
import { CageMother } from './cage-mother';
import { ContractInterface } from '../../../src/contracts/domain/interfaces/contract.interface';
import { ContractTravelMother } from './contract-travel.mother';

export class ContractCreatorMother {
  static create(dto?: Partial<ContractCreateRequest>): ContractCreateRequest {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UuidMother.create(),
      pets: dto?.pets ?? [UuidMother.create()],
      number: NumberMother.create(),
      startDate: DateMother.recent(),
      documentation: ContractDocumentationMother.create(),
      cage: CageMother.create(),
      travel: {
        hasServiceIncluded: faker.datatype.boolean(),
        hasServiceAccompanied: faker.datatype.boolean(),
        typeTraveling: TypeTravelingMother.create(),
      },
    };
  }

  static createWithTravel(dto?: Partial<ContractInterface>): ContractInterface {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UuidMother.create(),
      pets: dto?.pets ?? [UuidMother.create()],
      number: NumberMother.create(),
      startDate: DateMother.recent(),
      endDate: dto?.endDate ?? null,
      guideNumber: dto?.guideNumber ?? '',
      status: dto?.status ?? 'in-process',
      services: {
        documentation: ContractDocumentationMother.create(),
        cage: CageMother.create(),
        travel: ContractTravelMother.create(),
      },
      user: dto?.user ?? UuidMother.create(),
    };
  }
}
