import { ContractInterface } from '../../domain/interfaces/contract.interface';
import { ContractDetailResponse } from '../../../contract-detail/application/response/contract-detail.response';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export interface ContractResponse
  extends Omit<ContractInterface, 'details' | 'adviser' | 'client'> {
  adviser: UserWithoutWithRoleResponse;
  client: UserWithoutWithRoleResponse;
  details: ContractDetailResponse[];
}
