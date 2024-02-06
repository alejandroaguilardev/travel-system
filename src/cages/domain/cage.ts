import { Uuid, UuidOptional } from '../../common/domain/value-object';
import { CageResponse } from './interfaces/cage.response';
import { CageChosenDimensions } from './value-object/cage-selected-dimensions';
import { CageChosenModel } from './value-object/cage-selected-model';
import { CageChosenType } from './value-object/cage-selected-type';

export class Cage {
  constructor(
    readonly id: Uuid,
    readonly typeCage: CageChosenType,
    readonly modelCage: CageChosenModel,
    readonly dimensionsCage: CageChosenDimensions,
    readonly user: UuidOptional,
  ) {}

  toJson(): CageResponse {
    return {
      id: this.id.value,
      typeCage: this.typeCage.value,
      modelCage: this.modelCage.value,
      dimensionsCage: this.dimensionsCage.value,
      user: this.user.value,
    };
  }
}
