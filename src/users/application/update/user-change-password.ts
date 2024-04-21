import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserRepository } from '../../domain/user.repository';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserResponse } from '../../domain/interfaces/user.response';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { UserWithoutWithRoleResponse } from '../../domain/interfaces/user-without.response';
import { UserPassword } from '../../domain/value-object/user-password';
import { Auth } from '../../../auth/domain/auth';
import { Hashing } from '../../../common/application/services/hashing';
import { ErrorBadRequest } from '../../../common/domain/errors/error-bad-request';
import { UserDocumentNumber } from '../../domain/value-object/profile/user-document-number';
import { UserDocument } from '../../domain/value-object/profile/user-document';

export class UserChangePasswordUpdater {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashing: Hashing,
  ) {}

  async execute(
    password: UserPassword,
    newPassword: UserPassword,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const uuid = new Uuid(user.id);

    const response = await this.userRepository.searchById<UserResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    const credentials = new Auth(
      new UserDocument(response.profile.document),
      new UserDocumentNumber(response.profile.documentNumber),
      new UserPassword(password.value),
    );

    if (
      !credentials.passwordMatches(
        new UserPassword(response.password),
        this.hashing,
      )
    ) {
      throw new ErrorBadRequest('La contraseña es incorrecta');
    }

    const updatePassword = new UserPassword(
      this.hashing.hashPassword(newPassword.value),
    );

    await this.userRepository.updatePassword(uuid, updatePassword);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
