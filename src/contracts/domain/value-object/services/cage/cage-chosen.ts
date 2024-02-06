import { UuidOptional } from '../../../../../common/domain/value-object';
import { CageChosenModel } from '../../../../../cages/domain/value-object/cage-selected-model';
import { CageChosenType } from '../../../../../cages/domain/value-object/cage-selected-type';
import { CageChosenInterface } from '../../../interfaces/cage.interface';
import { CageChosenDimensions } from '../../../../../cages/domain/value-object/cage-selected-dimensions';

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
