import { CageInterface, StatusInterface } from '../interfaces';
import { ContractHasServiceIncluded } from './contract-has-service.included';
import { CageChosen } from './cage';
import { ContractStatus } from '../../../common/domain/value-object/contract-status';

export class ContractCage {
  constructor(
    readonly status: ContractStatus,
    public hasServiceIncluded: ContractHasServiceIncluded,
    readonly chosen: CageChosen,
    readonly recommendation: CageChosen,
  ) {}

  toJson(): CageInterface {
    return {
      status: this.status.value as StatusInterface,
      hasServiceIncluded: this.hasServiceIncluded.value,
      chosen: this.chosen.toJson(),
      recommendation: this.recommendation.toJson(),
    };
  }

  changeStatus(): void {
    const chosen =
      this.chosen.typeCage.value &&
      this.chosen.dimensionsCage.value &&
      this.chosen.modelCage.value;

    if (chosen) {
      this.status.value = 'completed';
    } else {
      this.status.value = 'pending';
    }
  }
}
