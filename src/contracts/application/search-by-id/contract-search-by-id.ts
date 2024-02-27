import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import {
  ContractResponse,
  ContractWithDetailsResponse,
} from '../response/contract.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ContractDetailRepository } from '../../../contract-detail/domain/contract-detail.repository';

export class ContractSearchById {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractWithDetailsResponse> {
    const uuid = new Uuid(id);
    const contract =
      await this.contractRepository.searchById<ContractResponse>(uuid);

    if (!contract) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contratos'));
    }

    const details = await Promise.all(
      contract.details.map((_) =>
        this.contractDetailRepository.searchByIdWithPet(new Uuid(_)),
      ),
    );

    const response: ContractWithDetailsResponse = { ...contract, details };

    this.hasPermission(user, response);

    return response;
  }

  private hasPermission(
    user: UserWithoutWithRoleResponse,
    contract: ContractWithDetailsResponse,
  ) {
    if (user.id === contract.client) {
      return;
    }

    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.READ);
  }
}
