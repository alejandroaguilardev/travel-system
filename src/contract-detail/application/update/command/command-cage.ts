import {
  ContractStatus,
  UuidOptional,
} from '../../../../common/domain/value-object';
import { CageInterface } from '../../../domain/interfaces';
import { ContractHasServiceIncluded } from '../../../domain/value-object';
import { ContractCage } from '../../../domain/value-object';
import { CageChosenModel } from '../../../../cages/domain/value-object/cage-selected-model';
import { CageChosenType } from '../../../../cages/domain/value-object/cage-selected-type';
import { CageChosenDimensions } from '../../../../cages/domain/value-object/cage-selected-dimensions';
import {
  CageChosen,
  CageRecommendation,
} from '../../../domain/value-object/cage';

export class CommandContractCage {
  static execute(cage: CageInterface): ContractCage {
    return new ContractCage(
      new ContractStatus(cage.status),
      new ContractHasServiceIncluded(cage.hasServiceIncluded),
      new CageChosen(
        new CageChosenModel(cage?.chosen?.modelCage ?? ''),
        new CageChosenType(cage?.chosen?.typeCage ?? ''),
        new CageChosenDimensions(cage?.chosen?.dimensionsCage ?? ''),
        new UuidOptional(cage.chosen?.user ?? ''),
      ),
      new CageRecommendation(cage.recommendation),
    );
  }
}
