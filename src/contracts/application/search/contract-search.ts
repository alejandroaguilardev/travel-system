import { ContractRepository } from '../../domain/contract.repository';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';
import { ResponseSearch } from '../../../common/domain/response/response-search';

export class ContractSearch {
  constructor(private readonly contractRepository: ContractRepository) {}

  execute(
    criteriaRequest: CriteriaRequest,
  ): Promise<ResponseSearch<ContractSearch>> {
    const criteria = CommandCriteria.fromData(criteriaRequest);
    return this.contractRepository.search(criteria);
  }
}
