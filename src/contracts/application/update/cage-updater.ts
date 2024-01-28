import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { CageDefinition } from '../../domain/interfaces/cage';
import { ContractFactory } from '../../domain/factory/contract.factory';
import { ContractResponse } from '../response/contract.response';
import { Contract } from '../../domain/contract';
import { ContractCage } from '../../domain/value-object/services/service-cage';

export class ContractCageUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    cageRequest: CageDefinition,
  ): Promise<ContractResponse> {
    const uuid = new Uuid(contractId);

    let contract =
      await this.contractRepository.searchById<ContractResponse>(uuid);

    if (!contract) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    Contract.statusError(contract.status);

    contract = ContractCage.selectedChosen(contract, cageRequest);
    contract = Contract.establishedStatus(contract);

    const contractUpdated = ContractFactory.converter(contract);
    await this.contractRepository.update(uuid, contractUpdated);
    return contractUpdated.toJson();
  }
}
