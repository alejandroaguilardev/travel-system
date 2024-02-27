import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ContractDetailResponse } from '../response/contract-detail.response';

export class ContractDetailSearch {
  constructor(
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  execute(
    criteriaRequest: CriteriaRequest,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<ContractDetailResponse>> {
    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.LIST);

    const criteria = CommandCriteria.fromData(criteriaRequest);
    return this.contractDetailRepository.search(criteria);
  }
}
