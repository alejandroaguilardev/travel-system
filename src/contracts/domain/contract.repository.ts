import { Repository } from '../../common/domain/repository';
import { ContractResponse } from '../application/response/contract.response';
import { Contract } from './contract';
import { Uuid } from '../../common/domain/value-object/uuid';
import { ContractEndDate, ContractNumber } from './value-object';
import { ContractFolder } from './value-object/contract-folder';
import { ContractDetail } from '../../contract-detail/domain/contract-detail';
import { ContractReasonForCancellation } from './value-object/reason-for-cancellation';
import { PayInInstallments } from './value-object/pay-in-installments/pay-in-installments';
import { Criteria } from '../../common/domain/criteria/criteria';
import { ContractStatusInterface } from './interfaces/contract.interface';

export interface ContractRepository extends Repository<Contract> {
  finish(
    contractId: Uuid,
    endDate: ContractEndDate,
    status: ContractStatusInterface,
  ): Promise<void>;
  cancel(
    contractId: Uuid,
    endDate: ContractEndDate,
    reasonForCancellation: ContractReasonForCancellation,
    status: ContractStatusInterface,
  ): Promise<void>;
  searchByIdWithPet(uuid: Uuid): Promise<ContractResponse>;
  searchPaymentsMissing(criteria: Criteria): Promise<ContractResponse[]>;
  findFinishAndUpdateReview(criteria: Criteria): Promise<ContractResponse[]>;
  searchTravelFound(): Promise<ContractResponse[]>;
  updateFolder(
    contractId: Uuid,
    folder: ContractFolder,
    number: ContractNumber,
  ): Promise<void>;
  updateDetail(contractId: Uuid, details: ContractDetail[]): Promise<void>;
  updatePayment(contractId: Uuid, payment: PayInInstallments): Promise<void>;
}
