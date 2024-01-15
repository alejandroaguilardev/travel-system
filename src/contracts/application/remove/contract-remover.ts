import { ContractRepository } from '../../domain/contract.repository';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';

export class ContractRemover {
  constructor(private readonly roleRepository: ContractRepository) {}

  async execute(id: string): Promise<ResponseSuccess> {
    const uuid = new Uuid(id);

    await this.roleRepository.remove(uuid);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_DELETED,
    );
  }
}
