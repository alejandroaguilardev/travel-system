import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractFactory } from '../../domain/factory/contract.factory';
import { ContractCreateRequest } from './contract-create-request';

export class ContractCreator {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractRequest: ContractCreateRequest,
  ): Promise<ResponseSuccess> {
    const newContract = ContractFactory.create(contractRequest);
    await this.contractRepository.save(newContract);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
