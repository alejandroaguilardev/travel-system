import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserWithoutWithRoleResponse } from '../../../users/application/response/user-without.response';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractResponse } from '../response/contract.response';
import { Contract } from '../../domain/contract';
import { CommandUpdater } from './command/command-updater';

export class ContractUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    id: string,
    contract: Contract,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    if (!user) {
      console.log('role');
    }
    const uuid = new Uuid(id);

    const response =
      await this.contractRepository.searchById<ContractResponse>(uuid);
    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }

    const updateContract = CommandUpdater.execute(contract.toJson(), response);

    await this.contractRepository.update(uuid, updateContract);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
