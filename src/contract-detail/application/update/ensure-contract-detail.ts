import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractDetailInterface } from '../../../contract-detail/domain/interfaces';

export class EnsureContractDetail {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async searchEnsure(
    contractUuid: Uuid,
    contractDetailUuid: Uuid,
  ): Promise<{
    contractResponse: ContractResponse;
    contractDetailResponse: ContractDetailInterface;
    detailsResponse: ContractDetailResponse[];
  }> {
    const [contractResponse, contractDetailResponse] = await Promise.all([
      this.contractRepository.searchById<ContractResponse>(contractUuid),
      this.contractDetailRepository.searchById<ContractDetailInterface>(
        contractDetailUuid,
      ),
    ]);

    const detailsResponse = await Promise.all(
      contractResponse?.details?.map((_) =>
        this.contractDetailRepository.searchByIdWithPet(new Uuid(_)),
      ) ?? [],
    );
    this.errors(contractResponse, contractDetailResponse);
    return { contractResponse, contractDetailResponse, detailsResponse };
  }

  private errors(
    contractResponse: ContractResponse,
    contractDetailResponse: ContractDetailInterface,
  ) {
    if (!contractResponse) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }

    if (!contractDetailResponse) {
      throw new ErrorNotFound(
        ErrorNotFound.messageDefault('detalle del contrato'),
      );
    }
  }

  hasPermission(
    user: UserWithoutWithRoleResponse,
    contract: ContractResponse,
    authPermission: AuthPermission,
  ) {
    if (user.id === contract.client) {
      return;
    }
    PermissionValidator.execute(user, AuthGroup.CONTRACTS, authPermission);
  }
}
