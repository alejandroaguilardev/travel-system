import { ContractStatus } from '../contract-status';
import { ContractHasServiceIncluded } from '../contract-has-service.included';
import { CageRecommendation } from './cage/cage-recommendation';
import { CageChosen } from '././cage/cage-chosen';
import { CageSwornDeclaration } from './cage/cage-sworn-declaration';
import { CageDefinition } from '../../interfaces/cage';
import { StatusDefinition } from '../../interfaces/status';
import { ContractResponse } from '../../../application/response/contract.response';
import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';
import { CageChosenModel } from './cage/cage-selected-model';
import { CageChosenType } from './cage/cage-selected-type';
import { CageChosenDimensions } from './cage/cage-selected-dimensions';
import { ContractDefinition } from '../../interfaces/contract';

export class ContractCage {
  constructor(
    readonly status: ContractStatus,
    public hasServiceIncluded: ContractHasServiceIncluded,
    readonly swornDeclaration: CageSwornDeclaration,
    readonly chosen: CageChosen,
    readonly recommendation: CageRecommendation,
  ) {}

  toJson(): CageDefinition {
    return {
      status: this.status.value as StatusDefinition,
      hasServiceIncluded: this.hasServiceIncluded.value,
      swornDeclaration: this.swornDeclaration.value,
      chosen: this.chosen.toJson(),
      recommendation: this.recommendation.value,
    };
  }

  static selectedChosen(
    contract: ContractResponse,
    cage: CageDefinition,
  ): ContractDefinition {
    if (!cage.swornDeclaration) {
      throw new ErrorInvalidadArgument('Se debe aceptar la declaración jurada');
    }

    const chosen = new CageChosen(
      new CageChosenModel(cage.chosen.modelCage),
      new CageChosenType(cage.chosen.typeCage),
      new CageChosenDimensions(cage.chosen.dimensionsCage),
    );

    contract.services.cage.chosen = chosen.toJson();
    contract.services.cage.swornDeclaration = cage.swornDeclaration;

    contract.services.cage.status = 'completed';
    return contract;
  }
}
