import { ContractInterface } from '../../domain/interfaces/contract.interface';
import { ContractDetailResponse } from '../../../contract-detail/application/response/contract-detail.response';

export interface ContractResponse extends ContractInterface {}

export interface ContractWithDetailsResponse
  extends Omit<ContractInterface, 'details'> {
  details: ContractDetailResponse[];
}
