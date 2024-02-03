import { UuidOptional } from '../../../../common/domain/value-object';
import { CageInterface } from '../../../domain/interfaces';
import {
  ContractStatus,
  ContractHasServiceIncluded,
} from '../../../domain/value-object';
import { ContractCage } from '../../../domain/value-object/services';
import {
  CageSwornDeclaration,
  CageChosen,
  CageChosenModel,
  CageChosenType,
  CageChosenDimensions,
  CageRecommendation,
} from '../../../domain/value-object/services/cage';

export class CommandContractCage {
  static execute(cage: CageInterface): ContractCage {
    return new ContractCage(
      new ContractStatus(cage.status),
      new ContractHasServiceIncluded(cage.hasServiceIncluded),
      new CageSwornDeclaration(cage.swornDeclaration),
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
