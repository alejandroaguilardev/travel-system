import { ResponseSearch } from '../../../common/domain/response/response-search';
import { RoleRepository } from '../../domain/role.repository';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { RoleResponse } from '../../domain/interfaces/role.response';

export class RoleSearch {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(
    criteria: Criteria,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<RoleResponse>> {
    PermissionValidator.execute(user, AuthGroup.ROLES, AuthPermission.LIST);

    return this.roleRepository.search<RoleResponse>(criteria);
  }
}
