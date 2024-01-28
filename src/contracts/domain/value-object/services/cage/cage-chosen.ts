import { CageChosenModel } from './cage-selected-model';
import { CageChosenType } from './cage-selected-type';
import { CageChosen as ICageChosen } from '../../../interfaces/cage';
import { CageChosenDimensions } from './cage-selected-dimensions';

export class CageChosen {
  constructor(
    readonly modelCage: CageChosenModel,
    readonly typeCage: CageChosenType,
    readonly dimensionsCage: CageChosenDimensions,
  ) {}

  toJson(): ICageChosen {
    return {
      modelCage: this.modelCage.value,
      typeCage: this.typeCage.value,
      dimensionsCage: this.dimensionsCage.value,
    };
  }
}
