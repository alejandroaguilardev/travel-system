import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractResponse } from '../response/contract.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export class ContractSearchById {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse> {
    const uuid = new Uuid(id);
    const contract = await this.contractRepository.searchByIdWithPet(uuid);

    if (!contract) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contratos'));
    }

    this.hasPermission(user, contract);

    return contract;
  }

  private hasPermission(
    user: UserWithoutWithRoleResponse,
    contract: ContractResponse,
  ) {
    if (user.id === contract.client.id) {
      return;
    }

    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.READ);
  }
}
