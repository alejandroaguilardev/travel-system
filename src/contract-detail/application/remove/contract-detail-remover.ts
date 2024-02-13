import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';

export class ContractDetailRemover {
  constructor(
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS_DETAIL,
      AuthPermission.READ,
    );

    const uuid = new Uuid(id);

    await this.contractDetailRepository.remove(uuid);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_DELETED,
    );
  }
}
