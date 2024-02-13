import { ContractRepository } from '../../domain/contract.repository';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { ContractResponse } from '../response/contract.response';

export class ContractSearch {
  constructor(private readonly contractRepository: ContractRepository) {}

  execute(
    criteriaRequest: CriteriaRequest,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<ContractResponse>> {
    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.LIST);

    const criteria = CommandCriteria.fromData(criteriaRequest);
    return this.contractRepository.search(criteria);
  }
}
