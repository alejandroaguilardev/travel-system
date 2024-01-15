import { ContractRepository } from '../../domain/contract.repository';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';
import { CriteriaFactory } from '../../../common/application/criteria/criteria.factory';
import { ResponseSearch } from '../../../common/domain/response/response-search';

export class ContractSearch {
  constructor(private readonly contractRepository: ContractRepository) {}

  execute(
    criteriaRequest: CriteriaRequest,
  ): Promise<ResponseSearch<ContractSearch>> {
    const criteria = CriteriaFactory.fromData(criteriaRequest);
    return this.contractRepository.search(criteria);
  }
}
