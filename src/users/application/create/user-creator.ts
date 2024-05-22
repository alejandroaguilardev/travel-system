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
import { ErrorBadRequest } from '../../../common/domain/errors/error-bad-request';
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

    if (!newUser.profile.documentNumber)
      throw new ErrorBadRequest(
        'el número documento de usuario no puede estar vació',
      );
    if (!newUser.profile.document)
      throw new ErrorBadRequest('el documento de usuario no puede estar vació');

    const find = await this.userRepository.searchDocument(
      newUser.profile.document,
      newUser.profile.documentNumber,
    );

    if (find) throw new ErrorBadRequest('el documento del  usuario ya existe');

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
