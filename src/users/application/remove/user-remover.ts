import { UserRepository } from '../../domain/user.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { UserWithoutWithRoleResponse } from '../../domain/interfaces/user-without.response';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ErrorAccess } from '../error/access';

export class UserRemover {
  constructor(private readonly userRepository: UserRepository) { }

  async remove(
    userId: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    ErrorAccess.permission(user, AuthPermission.DELETE);

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
