import { RoleRepository } from '../../domain/role.repository';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';

export class RoleRemover {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.ROLES, AuthPermission.DELETE);

    const uuid = new Uuid(id);

    await this.roleRepository.remove(uuid);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_DELETED,
    );
  }
}
