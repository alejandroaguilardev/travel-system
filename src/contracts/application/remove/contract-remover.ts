import { ContractRepository } from '../../domain/contract.repository';
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

export class ContractRemover {
  constructor(private readonly roleRepository: ContractRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.READ);

    const uuid = new Uuid(id);

    await this.roleRepository.remove(uuid);
    return ResponseMessage.createSuccessResponse(
      ContractRemover.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_DELETED.replace(
      '{{elemento}}',
      'el contrato',
    );
  }
}
