import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserRepository } from '../../domain/user.repository';
import { UserWithoutWithRoleResponse } from '../../domain/interfaces/user-without.response';
import {
  AuthPermission,
  AuthGroup,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';

export class UserSearchById {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<UserWithoutWithRoleResponse> {
    PermissionValidator.execute(user, AuthGroup.USERS, AuthPermission.READ);

    const uuid = new Uuid(id);
    const newUser = await this.userRepository.searchByIdWithRole(uuid);

    if (!newUser) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('usuario'));
    }
    return newUser;
  }
}
