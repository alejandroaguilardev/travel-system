import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractDetailInterface } from '../../../contract-detail/domain/interfaces';
import { ContractInterface } from '../../../contracts/domain/interfaces/contract.interface';

export class EnsureContractDetail {
  constructor(private readonly contractRepository: ContractRepository) { }

  async searchEnsure(
    contractUuid: Uuid,
    contractDetailUuid: Uuid,
  ): Promise<{
    contractResponse: ContractInterface;
    contractDetailResponse: ContractDetailInterface;
  }> {
    const contractResponse =
      await this.contractRepository.searchById<ContractInterface>(contractUuid);

    const contractDetailResponse = contractResponse.details.find(
      (_) => _.id === contractDetailUuid.value,
    );

    this.errors(contractResponse);
    return { contractResponse, contractDetailResponse };
  }

  private errors(contractResponse: ContractInterface) {
    if (!contractResponse) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }
  }

  hasPermission(
    user: UserWithoutWithRoleResponse,
    contract: ContractInterface,
    authPermission: AuthPermission,
    authGroup?: AuthGroup,

  ) {
    if (user.id === contract.client) {
      return;
    }
    PermissionValidator.execute(user, authGroup ?? AuthGroup.CONTRACTS, authPermission);
  }
}
