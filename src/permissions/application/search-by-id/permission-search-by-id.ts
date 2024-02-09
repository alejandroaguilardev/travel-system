import { PermissionRepository } from '../../domain/permission.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { PermissionResponse } from '../response/permission.response';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export class PermissionSearchById {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<PermissionResponse | null> {
    PermissionValidator.execute(
      user,
      AuthGroup.PERMISSIONS,
      AuthPermission.READ,
    );

    const uuid = new Uuid(id);
    const permission =
      await this.permissionRepository.searchById<PermissionResponse>(uuid);
    if (!permission) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }
    return permission;
  }
}
