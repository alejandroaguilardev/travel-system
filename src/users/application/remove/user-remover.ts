import { UserRepository } from '../../domain/user.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';

export class UserRemover {
  constructor(private readonly userRepository: UserRepository) {}

  async remove(userId: string): Promise<ResponseSuccess> {
    const uuid = new Uuid(userId);
    await this.userRepository.remove(uuid);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_DELETED,
    );
  }
}
