import { Hashing } from '../../../common/application/services/hashing';
import { UserRepository } from '../../domain/user.repository';
import { UserPassword } from '../../domain/value-object/user-password';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { User } from '../../domain/user';
import { UserWithoutWithRoleResponse } from '../../domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class UserCreator {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashing: Hashing,
  ) {}

  async create(
    newUser: User,
    password: UserPassword,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.USERS, AuthPermission.CREATE);

    newUser.setPassword(
      new UserPassword(this.hashing.hashPassword(password.value)),
    );
    await this.userRepository.save(newUser);
    return ResponseMessage.createSuccessResponse(UserCreator.messageSuccess());
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_CREATED.replace(
      '{{elemento}}',
      'el usuario',
    );
  }
}
