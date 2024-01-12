import { Hashing } from '../../../common/application/services/hashing';
import { UserRepository } from '../../domain/user.repository';
import { UserCreatorRequest } from './create-user-request';
import { UserPassword } from '../../domain/user-password';
import { UserFactory } from '../../domain/user-factory';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';

export class UserCreator {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashing: Hashing,
  ) {}

  async create(
    userCreatorRequest: UserCreatorRequest,
  ): Promise<ResponseSuccess> {
    const user = UserFactory.create(userCreatorRequest);
    const password = this.hashing.hashPassword(user.password.value);
    user.setPassword(new UserPassword(password));
    await this.userRepository.save(user);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
