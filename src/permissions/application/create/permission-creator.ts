import { PermissionRepository } from '../../domain/permission.repository';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { ErrorDuplicateElement } from '../../../common/domain/errors/error-duplicate-element';
import { Permission } from '../../domain/permission';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';

export class PermissionCreator {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(
    permission: Permission,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(
      user,
      AuthGroup.PERMISSIONS,
      AuthPermission.CREATE,
    );

    const response = await this.permissionRepository.searchById(permission.id);

    if (response) {
      throw new ErrorDuplicateElement('permiso');
    }

    await this.permissionRepository.save(permission);
    return ResponseMessage.createSuccessResponse(
      PermissionCreator.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_CREATED.replace(
      '{{elemento}}',
      'el permiso',
    );
  }
}
