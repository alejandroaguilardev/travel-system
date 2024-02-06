import { Hashing } from '../../../common/application/services/hashing';
import { UserRepository } from '../../domain/user.repository';
import { UserPassword } from '../../domain/value-object/user-password';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { User } from '../../domain/user';
import { UserWithoutWithRoleResponse } from '../response/user-without.response';

export class UserCreator {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashing: Hashing,
  ) {}

  async create(
    newUser: User,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    if (!user.id) {
      console.log(user.id);
    }

    const password = this.hashing.hashPassword(newUser.password.value);
    newUser.setPassword(new UserPassword(password));
    await this.userRepository.save(newUser);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
