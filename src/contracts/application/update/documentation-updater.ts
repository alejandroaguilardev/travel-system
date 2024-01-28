import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { DocumentationDefinition } from '../../domain/interfaces/documentation';
import { ContractFactory } from '../../domain/factory/contract.factory';
import { ContractResponse } from '../response/contract.response';
import { Contract } from '../../domain/contract';
import { ContractDocumentation } from '../../domain/value-object/services/service-documentation';

export class ContractDocumentationUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    documentationRequest: DocumentationDefinition,
  ): Promise<ContractResponse> {
    const uuid = new Uuid(contractId);

    let contract =
      await this.contractRepository.searchById<ContractResponse>(uuid);

    if (!contract) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    Contract.statusError(contract.status);

    contract = ContractDocumentation.documentationIsApplied(
      contract,
      documentationRequest,
    );
    contract = Contract.establishedStatus(contract);

    const contractUpdated = ContractFactory.converter(contract);
    await this.contractRepository.update(uuid, contractUpdated);
    return contractUpdated.toJson();
  }
}
