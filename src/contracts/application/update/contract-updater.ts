import { ContractRepository } from '../../domain/contract.repository';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { ContractUpdaterRequest } from './contract-updater-request';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ContractFactory } from '../../domain/factory/contract.factory';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractResponse } from '../response/contract.response';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';

export class ContractUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    id: string,
    contractRequest: ContractUpdaterRequest,
  ): Promise<ResponseSuccess> {
    const uuid = new Uuid(id);
    const response =
      await this.contractRepository.searchById<ContractResponse>(uuid);
    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }

    const contractUpdate = ContractFactory.update(contractRequest, response);

    await this.contractRepository.update(uuid, contractUpdate);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
