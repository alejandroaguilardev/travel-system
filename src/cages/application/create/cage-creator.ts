import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  ResponseMessage,
  MessageDefault,
} from '../../../common/domain/response/response-message';
import { CageRepository } from '../../domain/cage.repository';
import { Cage } from '../../domain/cage';
import { UserWithoutWithRoleResponse } from '../../../users/application/response/user-without.response';

export class CageCreator {
  constructor(private readonly cageRepository: CageRepository) {}

  async create(
    cage: Cage,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    if (!user) {
      console.log(user);
    }
    await this.cageRepository.save(cage);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
