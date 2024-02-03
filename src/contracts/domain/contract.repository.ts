import { Repository } from '../../common/domain/repository';
import { ContractResponse } from '../application/response/contract.response';
import { Contract } from './contract';
import { Uuid } from '../../common/domain/value-object/uuid';
import { ContractEndDate, ContractStatus } from './value-object';
import {
  ContractTravel,
  ContractCage,
  ContractDocumentation,
} from './value-object/services';

export interface ContractRepository extends Repository<Contract> {
  searchContractByClient(clientId: Uuid): Promise<ContractResponse[]>;
  updateDocumentation(
    contractId: Uuid,
    status: ContractStatus,
    documentation: ContractDocumentation,
  ): Promise<void>;
  updateCage(
    contractId: Uuid,
    status: ContractStatus,
    cage: ContractCage,
  ): Promise<void>;
  updateTravel(
    contractId: Uuid,
    status: ContractStatus,
    travel: ContractTravel,
  ): Promise<void>;
  finish(contractId: Uuid, endDate: ContractEndDate): Promise<void>;
}
