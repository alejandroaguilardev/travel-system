import { ServicesDefinition } from '../interfaces/services';
import { ContractCage } from './services/service-cage';
import { ContractDocumentation } from './services/service-documentation';
import { ContractTravel } from './services/service-travel';

export class ContractServices {
  constructor(
    readonly documentation: ContractDocumentation,
    readonly cage: ContractCage,
    readonly travel: ContractTravel,
  ) {}

  toJson(): ServicesDefinition {
    return {
      documentation: this.documentation.toJson(),
      cage: this.cage.toJson(),
      travel: this.travel.toJson(),
    };
  }
}
