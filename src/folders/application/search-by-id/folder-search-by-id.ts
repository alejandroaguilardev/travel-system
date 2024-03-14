import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { FolderRepository } from '../../domain/folder.repository';
import { FolderResponse } from '../../domain/interfaces/folder.response';
import {
  AuthPermission,
  AuthGroup,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export class FolderSearchById {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<FolderResponse> {
    PermissionValidator.execute(user, AuthGroup.CAGES, AuthPermission.READ);

    const uuid = new Uuid(id);
    const response =
      await this.folderRepository.searchById<FolderResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('jaulas'));
    }

    return response;
  }
}
