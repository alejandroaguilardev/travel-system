import { ContractCreateRequest } from '../create/contract-create-request';

export interface ContractUpdaterRequest
  extends Partial<ContractCreateRequest> {}
