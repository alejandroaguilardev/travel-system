import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { ContractDocumentation } from '../../domain/value-object/service-documentation';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractResponse } from '../../..//contracts/application/response/contract.response';
import { ContractStatus } from '../../../common/domain/value-object/contract-status';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { ContractDetailResponse } from '../response/contract-detail.response';

export class ContractDetailDocumentationUpdater {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async execute(
    contractId: string,
    contractDetailId: string,
    documentation: ContractDocumentation,
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

    const status = new ContractStatus(contract.status);
    status.statusError();

    documentation.documentationIsApplied();

    this.hasPermission(user, contract);

    await this.contractDetailRepository.updateDocumentation(
      contractDetailUuid,
      documentation,
    );

    return {
      contract: {
        ...contract,
        status: status.value,
      },
      contractDetail: {
        ...contractDetail,
        documentation: documentation.toJson(),
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
      AuthGroup.CONTRACTS,
      AuthPermission.DOCUMENTATION,
    );
  }
}
