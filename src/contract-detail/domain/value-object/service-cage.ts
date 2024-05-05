import { CageInterface, StatusInterface } from '../interfaces';
import { ContractHasServiceIncluded } from './contract-has-service.included';
import { CageChosen } from './cage';
import { ContractStatusDetail } from '../../../common/domain/value-object/contract-status-detail';
import { ContractCageConfirmation } from './cage/cage-confirmation';
import { ContractCagePetTravelAcquisition } from './cage/cage-acquisition';
import { ContractCageIsCabenTransporting } from './cage/cage-cabin-transporting';

export class ContractCage {
  constructor(
    readonly status: ContractStatusDetail,
    public hasServiceIncluded: ContractHasServiceIncluded,
    readonly chosen: CageChosen,
    public confirmation: ContractCageConfirmation,
    public petTravelAcquisition: ContractCagePetTravelAcquisition,
    public isCabinTransporting: ContractCageIsCabenTransporting,
  ) {}

  toJson(): CageInterface {
    return {
      status: this.status.value as StatusInterface,
      hasServiceIncluded: this.hasServiceIncluded.value,
      chosen: this.chosen.toJson(),
      confirmation: this.confirmation.value,
      petTravelAcquisition: this.petTravelAcquisition.value,
      isCabinTransporting: this.isCabinTransporting.value,
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
