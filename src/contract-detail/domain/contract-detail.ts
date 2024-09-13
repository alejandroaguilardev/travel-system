import { Uuid, UuidOptional } from '../../common/domain/value-object';
import { ContractDetailInterface } from './interfaces';
import {
  ContractCage,
  ContractDocumentation,
  ContractTravel,
} from './value-object';
import { ContractTopico } from './value-object/contract-topico';

export class ContractDetail {
  constructor(
    readonly id: Uuid,
    readonly documentation: ContractDocumentation,
    readonly cage: ContractCage,
    readonly travel: ContractTravel,
    readonly pet: UuidOptional,
    readonly user: UuidOptional,
    readonly topico: ContractTopico,
  ) { }

  toJson(): ContractDetailInterface {
    return {
      id: this.id.value,
      documentation: this.documentation.toJson(),
      cage: this.cage.toJson(),
      travel: this.travel.toJson(),
      pet: this.pet.value,
      user: this.user.value,
      topico: this.topico.toJson(),
    };
  }
}
