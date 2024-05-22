import { Uuid } from '../../../../common/domain/value-object/uuid';
import { UserRepository } from '../../../domain/user.repository';
import { ErrorNotFound } from '../../../../common/domain/errors/error-not-found';
import { UserResponse } from '../../../domain/interfaces/user.response';
import { ResponseSuccess } from '../../../../common/domain/response/response-success';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../../common/domain/response/response-message';
import { UserWithoutWithRoleResponse } from '../../../domain/interfaces/user-without.response';
import { UserProfileClient } from './update-client-profile';
import { CommandProfileUser } from '../command/command-user-profile';

export class UserProfileUpdater {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    profileClient: UserProfileClient,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const uuid = new Uuid(user.id);
    const response = await this.userRepository.searchById<UserResponse>(uuid);

    const profile = CommandProfileUser.execute({
      ...response.profile,
      phone: profileClient.phone,
    });

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    await this.userRepository.updateProfile(uuid, profile);
    return ResponseMessage.createSuccessResponse(
      UserProfileUpdater.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'el perfil',
    );
  }
}
