import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { ContractCage } from '../../domain/value-object/service-cage';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractStatus } from '../../../common/domain/value-object/contract-status';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';

export class ContractDetailCageUpdater {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async execute(
    contractId: string,
    contractDetailId: string,
    cage: ContractCage,
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

    await this.contractDetailRepository.updateCage(contractDetailUuid, cage);
    return {
      contract: {
        ...contract,
        status: status.value,
      },
      contractDetail: {
        ...contractDetail,
        cage: cage.toJson(),
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

    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.CAGE);
  }
}
