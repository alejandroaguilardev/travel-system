import { ContractDetailCreateRequest } from '../../../contract-detail/application/create';
import { ContractInterface } from '../../domain/interfaces/contract.interface';

export interface ContractCreateRequest
  extends Omit<ContractInterface, 'status' | 'endDate' | 'user' | 'details'> {
  details: ContractDetailCreateRequest[];
}
