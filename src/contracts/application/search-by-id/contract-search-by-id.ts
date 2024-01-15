import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractResponse } from '../response/contract.response';

export class ContractSearchById {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(id: string): Promise<ContractResponse> {
    const uuid = new Uuid(id);
    const response =
      await this.contractRepository.searchById<ContractResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contratos'));
    }

    return response;
  }
}
