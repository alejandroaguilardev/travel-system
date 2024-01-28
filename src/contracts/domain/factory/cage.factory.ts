import { ContractStatus } from '../value-object/contract-status';
import { ContractHasServiceIncluded } from '../value-object/contract-has-service.included';
import { ContractCage } from '../value-object/services/service-cage';
import { CageSwornDeclaration } from '../value-object/services/cage/cage-sworn-declaration';
import { CageChosen } from '../value-object/services/cage/cage-chosen';
import { CageChosenModel } from '../value-object/services/cage/cage-selected-model';
import { CageChosenType } from '../value-object/services/cage/cage-selected-type';
import { CageRecommendation } from '../value-object/services/cage/cage-recommendation';
import { CageDefinition } from '../interfaces/cage';
import { CageChosenDimensions } from '../value-object/services/cage/cage-selected-dimensions';

export class ContractCageFactory {
  static create(cage: CageDefinition): ContractCage {
    return new ContractCage(
      new ContractStatus(cage.status === 'none' ? 'pending' : cage.status),
      new ContractHasServiceIncluded(cage.hasServiceIncluded),
      new CageSwornDeclaration(cage.swornDeclaration),
      new CageChosen(
        new CageChosenModel(cage?.chosen?.modelCage ?? ''),
        new CageChosenType(cage?.chosen?.typeCage ?? ''),
        new CageChosenDimensions(cage?.chosen?.dimensionsCage ?? ''),
      ),
      new CageRecommendation(cage.recommendation),
    );
  }
}
