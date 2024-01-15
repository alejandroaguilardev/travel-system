import { ContractStatus } from '../value-object/contract-status';
import { ContractHasServiceIncluded } from '../value-object/contract-has-service.included';
import { ContractCage } from '../value-object/services/service-cage';
import { CageSwornDeclaration } from '../value-object/services/cage/cage-sworn-declaration';
import { CageChosen } from '../value-object/services/cage/cage-chosen';
import { CageChosenModel } from '../value-object/services/cage/cage-selected-model';
import { CageChosenType } from '../value-object/services/cage/cage-selected-type';
import { CageRecommendation } from '../value-object/services/cage/cage-recommendation';
import { CageDefinition } from '../interfaces/cage';

export class ContractCageFactory {
  static create(hasServiceIncluded: boolean): ContractCage {
    return new ContractCage(
      new ContractStatus(ContractStatus.status.pending),
      new ContractHasServiceIncluded(hasServiceIncluded),
      new CageSwornDeclaration(false),
      new CageChosen(new CageChosenModel(''), new CageChosenType('')),
      new CageRecommendation(''),
    );
  }
  static converter(cage: CageDefinition): ContractCage {
    return new ContractCage(
      new ContractStatus(cage.status),
      new ContractHasServiceIncluded(cage.hasServiceIncluded),
      new CageSwornDeclaration(cage.swornDeclaration),
      new CageChosen(
        new CageChosenModel(cage.chosen.modelCage),
        new CageChosenType(cage.chosen.typeCage),
      ),
      new CageRecommendation(cage.recommendation),
    );
  }
}
