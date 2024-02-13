import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from './contract-detail.response';

export interface ContractDetailUpdaterResponse {
  contract: ContractResponse;
  contractDetail: ContractDetailResponse;
}
