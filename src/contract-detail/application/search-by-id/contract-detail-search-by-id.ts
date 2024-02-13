import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { ContractDetailResponse } from '../response/contract-detail.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export class ContractDetailSearchById {
  constructor(
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailResponse> {
    const uuid = new Uuid(id);
    const response =
      await this.contractDetailRepository.searchById<ContractDetailResponse>(
        uuid,
      );

    if (!response) {
      throw new ErrorNotFound(
        ErrorNotFound.messageDefault('detalles del contratos'),
      );
    }
    this.hasPermission(user);

    return response;
  }

  private hasPermission(user: UserWithoutWithRoleResponse) {
    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS_DETAIL,
      AuthPermission.READ,
    );
  }
}
