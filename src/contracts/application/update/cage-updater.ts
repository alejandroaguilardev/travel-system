import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractResponse } from '../response/contract.response';
import { ContractCage } from '../../domain/value-object/services/service-cage';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ContractStatus } from '../../../common/domain/value-object/contract-status';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class ContractCageUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    cage: ContractCage,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse> {
    const uuid = new Uuid(contractId);

    const contract =
      await this.contractRepository.searchById<ContractResponse>(uuid);

    if (!contract) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    this.hasPermission(user, contract);

    const status = new ContractStatus(contract.status);
    status.statusError();

    await this.contractRepository.updateCage(uuid, status, cage);
    return {
      ...contract,
      services: {
        ...contract.services,
        cage: cage.toJson(),
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
