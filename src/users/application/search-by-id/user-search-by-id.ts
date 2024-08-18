import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserRepository } from '../../domain/user.repository';
import { UserWithoutWithRoleResponse } from '../../domain/interfaces/user-without.response';
import {
  AuthPermission,
  AuthGroup,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ErrorAccess } from '../error/access';

export class UserSearchById {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<UserWithoutWithRoleResponse> {
    const uuid = new Uuid(id);
    this.hasPermission(user, uuid);

    const newUser = await this.userRepository.searchByIdWithRole(uuid);

    if (!newUser) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('usuario'));
    }
    return newUser;
  }

  private hasPermission(user: UserWithoutWithRoleResponse, uuid: Uuid) {
    if (user.id === uuid.value) {
      return;
    }

    ErrorAccess.permission(user, AuthPermission.READ);
  }
}
