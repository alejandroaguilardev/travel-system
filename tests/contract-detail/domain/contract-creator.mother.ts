import { UuidMother } from '../../common/domain/uuid-mother';
import { ContractDocumentationMother } from './contract-documentation.mother';
import { CageMother } from './cage-mother';
import { ContractTravelMother } from './contract-travel.mother';
import { ContractDetailInterface } from '../../../src/contract-detail/domain/interfaces/contract-detail.interface';
import { ContractDetailResponse } from '../../../src/contract-detail/application/response/contract-detail.response';
import { PetMother } from '../../pet/domain/pet.mother';

export class ContractDetailCreatorMother {
  static createWithTravel(
    dto?: Partial<ContractDetailInterface>,
  ): ContractDetailInterface {
    return {
      id: dto?.id ?? UuidMother.create(),
      pet: dto?.pet ?? UuidMother.create(),
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
