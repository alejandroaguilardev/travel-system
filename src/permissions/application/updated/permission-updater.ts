import { PermissionRepository } from '../../domain/permission.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { PermissionResponse } from '../response/permission.response';
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
import { Permission } from '../../domain/permission';

export class PermissionUpdater {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(
    id: string,
    permission: Permission,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(
      user,
      AuthGroup.PERMISSIONS,
      AuthPermission.EDIT,
    );

    const uuid = new Uuid(id);

    const response =
      await this.permissionRepository.searchById<PermissionResponse>(uuid);
    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('permiso'));
    }

    await this.permissionRepository.update(uuid, permission);
    return ResponseMessage.createSuccessResponse(
      PermissionUpdater.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'el permiso',
    );
  }
}
