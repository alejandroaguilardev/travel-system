import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractResponse } from '../response/contract.response';
import { ContractDocumentation } from '../../domain/value-object/services/service-documentation';
import { ContractStatus } from '../../domain/value-object/contract-status';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class ContractDocumentationUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    documentation: ContractDocumentation,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse> {
    const uuid = new Uuid(contractId);
    const contract =
      await this.contractRepository.searchById<ContractResponse>(uuid);

    if (!contract) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    const status = new ContractStatus(contract.status);
    status.statusError();

    documentation.documentationIsApplied();

    this.hasPermission(user, contract);

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

  private hasPermission(
    user: UserWithoutWithRoleResponse,
    contract: ContractResponse,
  ) {
    if (user.id === contract.client) {
      return;
    }

    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS,
      AuthPermission.DOCUMENTATION,
    );
  }
}
