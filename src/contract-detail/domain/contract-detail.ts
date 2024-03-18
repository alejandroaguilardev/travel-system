import { Uuid, UuidOptional } from '../../common/domain/value-object';
import { ContractDetailInterface } from './interfaces';
import {
  ContractCage,
  ContractDocumentation,
  ContractGuideNumber,
  ContractTravel,
} from './value-object';

export class ContractDetail {
  constructor(
    readonly id: Uuid,
    readonly documentation: ContractDocumentation,
    readonly cage: ContractCage,
    readonly travel: ContractTravel,
    readonly guideNumber: ContractGuideNumber,
    readonly pet: UuidOptional,
    readonly user: UuidOptional,
  ) {}

  toJson(): ContractDetailInterface {
    return {
      id: this.id.value,
      documentation: this.documentation.toJson(),
      cage: this.cage.toJson(),
      travel: this.travel.toJson(),
      guideNumber: this.guideNumber.value,
      pet: this.pet.value,
      user: this.user.value,
    };
  }
}
