import { ContractDetailInterface } from '../../domain/interfaces/contract-detail.interface';
export interface ContractDetailCreateRequest
  extends Omit<ContractDetailInterface, 'user'> {}
