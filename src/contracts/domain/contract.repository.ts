import { Repository } from '../../common/domain/repository';
import { ContractResponse } from '../application/response/contract.response';
import { Contract } from './contract';
import { Uuid } from '../../common/domain/value-object/uuid';
import { ContractEndDate } from './value-object';

export interface ContractRepository extends Repository<Contract> {
  searchContractByClient(clientId: Uuid): Promise<ContractResponse[]>;
  finish(contractId: Uuid, endDate: ContractEndDate): Promise<void>;
}
