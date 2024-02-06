import { CreateCageRequest } from './create-cage-request';
import { Cage } from '../../domain/cage';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { UuidOptional } from '../../../common/domain/value-object/uuid-optional-value-object';
import { CageChosenType } from '../../domain/value-object/cage-selected-type';
import { CageChosenModel } from '../../domain/value-object/cage-selected-model';
import { CageChosenDimensions } from '../../domain/value-object/cage-selected-dimensions';

export class CommandCageCreator {
  static execute(data: CreateCageRequest, userId: string): Cage {
    return new Cage(
      new Uuid(data.id),
      new CageChosenType(data.typeCage),
      new CageChosenModel(data.modelCage),
      new CageChosenDimensions(data.dimensionsCage),
      new UuidOptional(userId),
    );
  }
}
