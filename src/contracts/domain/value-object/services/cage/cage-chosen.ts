import { CageChosenModel } from './cage-selected-model';
import { CageChosenType } from './cage-selected-type';

export class CageChosen {
  constructor(
    readonly modelCage: CageChosenModel,
    readonly typeCage: CageChosenType,
  ) {}

  toJson() {
    return {
      modelCage: this.modelCage.value,
      typeCage: this.typeCage.value,
    };
  }
}
