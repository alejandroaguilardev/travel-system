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
import { ErrorBadRequest } from '../../../common/domain/errors/error-bad-request';

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
    console.log(response.profile.document, userUpdate.profile.document.value);
    console.log(
      response.profile.documentNumber,
      userUpdate.profile.documentNumber.value,
    );

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
