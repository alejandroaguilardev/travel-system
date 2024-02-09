import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { RoleRepository } from '../../domain/role.repository';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { RoleResponse } from '../../domain/interfaces/role.response';

export class RoleSearchById {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<RoleResponse> {
    PermissionValidator.execute(user, AuthGroup.ROLES, AuthPermission.READ);

    const uuid = new Uuid(id);
    const response = await this.roleRepository.searchByIdResponse(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('rol'));
    }

    return response;
  }
}
