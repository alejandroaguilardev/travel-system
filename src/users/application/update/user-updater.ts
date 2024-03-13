import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserRepository } from '../../domain/user.repository';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserResponse } from '../../domain/interfaces/user.response';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { User } from '../../domain/user';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { UserWithoutWithRoleResponse } from '../../domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';

export class UserUpdater {
  constructor(private readonly userRepository: UserRepository) {}

  async update(
    id: string,
    userUpdate: User,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.USERS, AuthPermission.EDIT);

    const uuid = new Uuid(id);
    const response = await this.userRepository.searchById<UserResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    await this.userRepository.update(uuid, userUpdate);
    return ResponseMessage.createSuccessResponse(UserUpdater.messageSuccess());
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'el usuario',
    );
  }
}
