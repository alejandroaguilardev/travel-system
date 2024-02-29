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
import { UserProfile } from '../../domain/value-object/user-profile';

export class UserProfileUpdater {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    profile: UserProfile,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const uuid = new Uuid(user.id);
    const response = await this.userRepository.searchById<UserResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    await this.userRepository.updateProfile(uuid, profile);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
