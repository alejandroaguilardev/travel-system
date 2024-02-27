import { Repository } from '../../common/domain/repository';
import { ContractResponse } from '../application/response/contract.response';
import { Contract } from './contract';
import { Uuid } from '../../common/domain/value-object/uuid';
import { ContractEndDate } from './value-object';
import { Criteria } from '../../common/domain/criteria/criteria';
import { ResponseSearch } from '../../common/domain/response/response-search';

export interface ContractRepository extends Repository<Contract> {
  searchContractByClient(clientId: Uuid): Promise<ContractResponse[]>;
  searchClient(criteria: Criteria): Promise<ResponseSearch<ContractResponse>>;
  finish(contractId: Uuid, endDate: ContractEndDate): Promise<void>;
}
