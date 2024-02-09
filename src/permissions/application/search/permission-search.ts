import { PermissionRepository } from '../../domain/permission.repository';
import { PermissionResponse } from '../response/permission.response';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class PermissionSearch {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(
    criteria: Criteria,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<PermissionResponse>> {
    PermissionValidator.execute(
      user,
      AuthGroup.PERMISSIONS,
      AuthPermission.LIST,
    );

    return this.permissionRepository.search<PermissionResponse>(criteria);
  }
}
