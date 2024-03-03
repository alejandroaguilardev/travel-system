import { faker } from '@faker-js/faker';
import { UuidMother } from '../../common/domain/uuid-mother';
import { TypeTravelingMother } from './type-traveling-mother';
import { ContractDocumentationMother } from './contract-documentation.mother';
import { CageMother } from './cage-mother';
import { ContractTravelMother } from './contract-travel.mother';
import { ContractDetailCreateRequest } from '../../../src/contract-detail/application/create/contract-detail-create-request';
import { ContractDetailInterface } from '../../../src/contract-detail/domain/interfaces/contract-detail.interface';
import { ContractDetailResponse } from '../../../src/contract-detail/application/response/contract-detail.response';
import { PetMother } from '../../pet/domain/pet.mother';

export class ContractDetailCreatorMother {
  static create(
    dto?: Partial<ContractDetailCreateRequest>,
  ): ContractDetailCreateRequest {
    return {
      id: dto?.id ?? UuidMother.create(),
      pet: dto?.pet ?? UuidMother.create(),
      documentation: ContractDocumentationMother.create(),
      cage: CageMother.create(),
      travel: {
        hasServiceIncluded: faker.datatype.boolean(),
        hasServiceAccompanied: faker.datatype.boolean(),
        typeTraveling: TypeTravelingMother.create(),
      },
    };
  }

  static createWithTravel(
    dto?: Partial<ContractDetailInterface>,
  ): ContractDetailInterface {
    return {
      id: dto?.id ?? UuidMother.create(),
      pet: dto?.pet ?? UuidMother.create(),
      guideNumber: dto?.guideNumber ?? '',
      documentation: ContractDocumentationMother.create(),
      cage: CageMother.create(),
      travel: ContractTravelMother.create(),
      user: dto?.user ?? UuidMother.create(),
    };
  }
  static createWithPet(
    dto?: Partial<ContractDetailInterface>,
  ): ContractDetailResponse {
    return {
      ...this.createWithTravel(dto),
      pet: PetMother.createPetInterface(),
    };
  }
}
