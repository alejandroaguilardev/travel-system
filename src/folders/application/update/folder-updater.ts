import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { FolderRepository } from '../../domain/folder.repository';
import { Folder } from '../../domain/folder';
import { FolderResponse } from '../../domain/interfaces/folder.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class FolderUpdater {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(
    id: string,
    folder: Folder,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.CAGES, AuthPermission.EDIT);

    const uuid = new Uuid(id);

    const response =
      await this.folderRepository.searchById<FolderResponse>(uuid);
    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('expediente'));
    }

    await this.folderRepository.update(uuid, folder);

    return ResponseMessage.createSuccessResponse(
      FolderUpdater.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'la jaula',
    );
  }
}
