import { PermissionRepository } from '../../domain/permission.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class PermissionRemover {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(
      user,
      AuthGroup.PERMISSIONS,
      AuthPermission.DELETE,
    );

    const uuid = new Uuid(id);
    await this.permissionRepository.remove(uuid);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_DELETED,
    );
  }
}
