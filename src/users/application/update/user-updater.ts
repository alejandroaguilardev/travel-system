import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserRepository } from '../../domain/user.repository';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserResponse } from '../response/user.response';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { User } from '../../domain/user';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { UserWithoutWithRoleResponse } from '../response/user-without.response';

export class UserUpdater {
  constructor(private readonly userRepository: UserRepository) {}

  async update(
    id: string,
    userUpdate: User,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    if (!user) {
      console.log(user);
    }

    const uuid = new Uuid(id);
    const response = await this.userRepository.searchById<UserResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    await this.userRepository.update(uuid, userUpdate);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
