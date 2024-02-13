import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { ContractTravel } from '../../domain/value-object/service-travel';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { ContractStatus } from '../../../common/domain/value-object/contract-status';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractDetailResponse } from '../response/contract-detail.response';

export class ContractDetailTravelUpdater {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async execute(
    contractId: string,
    contractDetailId: string,
    travel: ContractTravel,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractUuid = new Uuid(contractId);
    const contractDetailUuid = new Uuid(contractDetailId);

    const contract =
      await this.contractRepository.searchById<ContractResponse>(contractUuid);

    const contractDetail =
      await this.contractDetailRepository.searchById<ContractDetailResponse>(
        contractDetailUuid,
      );

    if (!contract) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }

    if (!contractDetail) {
      throw new ErrorNotFound(
        ErrorNotFound.messageDefault('detalle del contrato'),
      );
    }

    this.hasPermission(user, contract);

    const status = new ContractStatus(contract.status);
    status.statusError();

    travel.setAirlineReservation();

    await this.contractDetailRepository.updateTravel(
      contractDetailUuid,
      travel,
    );

    return {
      contract: {
        ...contract,
        status: status.value,
      },
      contractDetail: {
        ...contractDetail,
        travel: travel.toJson(),
      },
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
      AuthGroup.CONTRACTS_DETAIL,
      AuthPermission.TRAVEL,
    );
  }
}
