import { Repository } from '../../common/domain/repository';
import { ContractResponse } from '../application/response/contract.response';
import { Contract } from './contract';
import { Uuid } from '../../common/domain/value-object/uuid';
import { ContractEndDate, ContractNumber } from './value-object';
import { ContractFolder } from './value-object/contract-folder';
import { ContractDetail } from '../../contract-detail/domain/contract-detail';
import { ContractReasonForCancellation } from './value-object/reason-for-cancellation';

export interface ContractRepository extends Repository<Contract> {
  finish(contractId: Uuid, endDate: ContractEndDate): Promise<void>;
  cancel(
    contractId: Uuid,
    endDate: ContractEndDate,
    reasonForCancellation: ContractReasonForCancellation,
  ): Promise<void>;
  searchByIdWithPet(detail: Uuid): Promise<ContractResponse>;
  updateFolder(
    contractId: Uuid,
    folder: ContractFolder,
    number: ContractNumber,
  ): Promise<void>;
  updateDetail(contractId: Uuid, details: ContractDetail[]): Promise<void>;
}
