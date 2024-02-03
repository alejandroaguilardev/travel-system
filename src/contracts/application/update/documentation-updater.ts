import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractResponse } from '../response/contract.response';
import { ContractDocumentation } from '../../domain/value-object/services/service-documentation';
import { ContractStatus } from '../../domain/value-object/contract-status';
import { UserWithoutWithRoleResponse } from '../../../users/application/response/user-without.response';

export class ContractDocumentationUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    documentation: ContractDocumentation,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse> {
    if (!user) {
      console.log(user);
    }

    const uuid = new Uuid(contractId);
    const contract =
      await this.contractRepository.searchById<ContractResponse>(uuid);

    if (!contract) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    const status = new ContractStatus(contract.status);
    status.statusError();

    documentation.documentationIsApplied();

    await this.contractRepository.updateDocumentation(
      uuid,
      status,
      documentation,
    );
    return {
      ...contract,
      services: {
        ...contract.services,
        documentation: documentation.toJson(),
      },
      status: status.value,
    };
  }
}
