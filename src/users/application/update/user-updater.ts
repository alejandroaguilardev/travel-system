import {
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
import { ErrorBadRequest } from '../../../common/domain/errors/error-bad-request';
import { UserPassword } from '../../domain/value-object/user-password';
import { ErrorAccess } from '../error/access';

export class UserUpdater {
  constructor(private readonly userRepository: UserRepository) { }

  async update(
    id: string,
    userUpdate: User,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    ErrorAccess.permission(user, AuthPermission.EDIT);

    if (!userUpdate.profile.documentNumber)
      throw new ErrorBadRequest(
        'el número documento de usuario no puede estar vació',
      );
    if (!userUpdate.profile.document)
      throw new ErrorBadRequest('el documento de usuario no puede estar vació');

    const uuid = new Uuid(id);
    const response = await this.userRepository.searchById<UserResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    if (
      response.profile.document !== userUpdate.profile.document.value ||
      response.profile.documentNumber !==
      userUpdate.profile.documentNumber.value
    ) {
      const find = await this.userRepository.searchDocument(
        userUpdate.profile.document,
        userUpdate.profile.documentNumber,
      );
      if (find)
        throw new ErrorBadRequest('el documento del  usuario ya existe');
    }

    userUpdate.setPassword(new UserPassword(response.password));

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
