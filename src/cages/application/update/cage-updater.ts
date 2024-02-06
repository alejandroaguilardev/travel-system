import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserWithoutWithRoleResponse } from '../../../users/application/response/user-without.response';
import { CageRepository } from '../../domain/cage.repository';
import { Cage } from '../../domain/cage';
import { CageResponse } from '../../domain/interfaces/cage.response';

export class CageUpdater {
  constructor(private readonly cageRepository: CageRepository) {}

  async execute(
    id: string,
    cage: Cage,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    if (!user) {
      console.log('role');
    }
    const uuid = new Uuid(id);

    const response = await this.cageRepository.searchById<CageResponse>(uuid);
    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }

    await this.cageRepository.update(uuid, cage);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
