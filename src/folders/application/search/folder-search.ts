import { FolderRepository } from '../../domain/folder.repository';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { FolderResponse } from '../../domain/interfaces/folder.response';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export class FolderSearch {
  constructor(private readonly folderRepository: FolderRepository) {}

  execute(
    criteria: Criteria,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<FolderResponse>> {
    PermissionValidator.execute(user, AuthGroup.CAGES, AuthPermission.LIST);

    return this.folderRepository.search<FolderResponse>(criteria);
  }
}
