import { RoleRepository } from '../../domain/role.repository';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { Role } from '../../domain/role';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { RoleInterface } from '../../domain/interfaces/role.interface';

export class RoleUpdater {
  constructor(private readonly roleRepository: RoleRepository) {}

  async update(
    id: string,
    role: Role,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.ROLES, AuthPermission.EDIT);

    const uuid = new Uuid(id);
    const response = await this.roleRepository.searchById<RoleInterface>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('rol'));
    }

    await this.roleRepository.update(uuid, role);

    return ResponseMessage.createSuccessResponse(RoleUpdater.messageSuccess());
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'el rol',
    );
  }
}
