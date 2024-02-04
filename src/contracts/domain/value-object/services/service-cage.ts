import { CageInterface, StatusInterface } from '../../interfaces';
import { ContractHasServiceIncluded } from '../contract-has-service.included';
import { ContractStatus } from '../contract-status';
import { CageChosen, CageRecommendation } from './cage';

export class ContractCage {
  constructor(
    readonly status: ContractStatus,
    public hasServiceIncluded: ContractHasServiceIncluded,
    readonly chosen: CageChosen,
    readonly recommendation: CageRecommendation,
  ) {}

  toJson(): CageInterface {
    return {
      status: this.status.value as StatusInterface,
      hasServiceIncluded: this.hasServiceIncluded.value,
      chosen: this.chosen.toJson(),
      recommendation: this.recommendation.value,
    };
  }
}
