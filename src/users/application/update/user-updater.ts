import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserRepository } from '../../domain/user.repository';
import { UpdateUserRequest } from './update-user-request';
import { InvalidArgumentError } from '../../../common/domain/value-object/invalid-argument-error';
import { UserFactory } from '../../domain/user-factory';
import { UserResponse } from '../response/user.response';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';

export class UserUpdater {
  constructor(private readonly userRepository: UserRepository) {}

  async update(
    id: string,
    userRequest: UpdateUserRequest,
  ): Promise<ResponseSuccess> {
    const uuid = new Uuid(id);
    const response = await this.userRepository.searchById<UserResponse>(uuid);

    if (!response) {
      throw new InvalidArgumentError('El usuario no existe');
    }

    const user = UserFactory.update(userRequest, UserFactory.create(response));
    await this.userRepository.update(uuid, user);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
