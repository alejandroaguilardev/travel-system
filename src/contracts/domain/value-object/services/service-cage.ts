import { ContractStatus } from '../contract-status';
import { ContractHasServiceIncluded } from '../contract-has-service.included';
import { CageRecommendation } from './cage/cage-recommendation';
import { CageChosen } from '././cage/cage-chosen';
import { CageSwornDeclaration } from './cage/cage-sworn-declaration';
import { CageDefinition } from '../../interfaces/cage';
import { StatusDefinition } from '../../interfaces/status';

export class ContractCage {
  constructor(
    readonly status: ContractStatus,
    public hasServiceIncluded: ContractHasServiceIncluded,
    readonly swornDeclaration: CageSwornDeclaration,
    readonly chosen: CageChosen,
    readonly recommendation: CageRecommendation,
  ) {}

  toJson(): CageDefinition {
    return {
      status: this.status.value as StatusDefinition,
      hasServiceIncluded: this.hasServiceIncluded.value,
      swornDeclaration: this.swornDeclaration.value,
      chosen: this.chosen.toJson(),
      recommendation: this.recommendation.value,
    };
  }

  setHasServiceIncluded(healthCertificate: boolean) {
    return (this.hasServiceIncluded = new ContractHasServiceIncluded(
      healthCertificate,
    ));
  }
}
