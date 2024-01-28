import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractResponse } from '../response/contract.response';

export class ContractSearchByIdClient {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(id: string): Promise<ContractResponse[]> {
    const uuid = new Uuid(id);
    const response = await this.contractRepository.searchContractByClient(uuid);

    return response;
  }
}
