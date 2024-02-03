import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';
import { CageInterface, StatusInterface } from '../../interfaces';
import { ContractHasServiceIncluded } from '../contract-has-service.included';
import { ContractStatus } from '../contract-status';
import { CageSwornDeclaration, CageChosen, CageRecommendation } from './cage';

export class ContractCage {
  constructor(
    readonly status: ContractStatus,
    public hasServiceIncluded: ContractHasServiceIncluded,
    readonly swornDeclaration: CageSwornDeclaration,
    readonly chosen: CageChosen,
    readonly recommendation: CageRecommendation,
  ) {}

  toJson(): CageInterface {
    return {
      status: this.status.value as StatusInterface,
      hasServiceIncluded: this.hasServiceIncluded.value,
      swornDeclaration: this.swornDeclaration.value,
      chosen: this.chosen.toJson(),
      recommendation: this.recommendation.value,
    };
  }

  hasSwornDeclaration(): void {
    if (!this.swornDeclaration.value) {
      throw new ErrorInvalidadArgument('Se debe aceptar la declaración jurada');
    }
  }
}
