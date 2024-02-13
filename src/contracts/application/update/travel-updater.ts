import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractTravel } from '../../domain/value-object/services/service-travel';
import { ContractResponse } from '../response/contract.response';
import { ContractStatus } from '../../../common/domain/value-object/contract-status';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';

export class ContractTravelUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    travel: ContractTravel,
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

    travel.setAirlineReservation();

    await this.contractRepository.updateTravel(uuid, status, travel);

    return {
      ...contract,
      services: {
        ...contract.services,
        travel: travel.toJson(),
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
