import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { UserWithoutWithRoleResponse } from '../../../users/application/response/user-without.response';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { ContractRepository } from '../../domain/contract.repository';
import { Contract } from '../../domain/contract';

export class ContractCreator {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contract: Contract,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    if (!user) {
      console.log(user);
    }
    await this.contractRepository.save(contract);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
