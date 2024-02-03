import { UuidOptional } from '../../../../../common/domain/value-object';
import { CageChosenModel } from './cage-selected-model';
import { CageChosenType } from './cage-selected-type';
import { CageChosenInterface } from '../../../interfaces/cage.interface';
import { CageChosenDimensions } from './cage-selected-dimensions';

export class CageChosen {
  constructor(
    readonly modelCage: CageChosenModel,
    readonly typeCage: CageChosenType,
    readonly dimensionsCage: CageChosenDimensions,
    readonly user: UuidOptional,
  ) {}

  toJson(): CageChosenInterface {
    return {
      modelCage: this.modelCage.value,
      typeCage: this.typeCage.value,
      dimensionsCage: this.dimensionsCage.value,
      user: this.user.value,
    };
  }
}
