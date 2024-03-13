import { UserRepository } from '../../domain/user.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../domain/interfaces/user-without.response';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';

export class UserRemover {
  constructor(private readonly userRepository: UserRepository) {}

  async remove(
    userId: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.USERS, AuthPermission.LIST);

    const uuid = new Uuid(userId);
    await this.userRepository.remove(uuid);
    return ResponseMessage.createSuccessResponse(UserRemover.messageSuccess());
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_DELETED.replace(
      '{{elemento}}',
      'el usuario',
    );
  }
}
