import { CageRepository } from '../../domain/cage.repository';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { CageResponse } from '../../domain/interfaces/cage.response';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export class CageSearch {
  constructor(private readonly cageRepository: CageRepository) {}

  execute(
    criteria: Criteria,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<CageResponse>> {
    PermissionValidator.execute(user, AuthGroup.CAGES, AuthPermission.LIST);

    return this.cageRepository.search<CageResponse>(criteria);
  }
}
