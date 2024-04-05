import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  ResponseMessage,
  MessageDefault,
} from '../../../common/domain/response/response-message';
import { FolderRepository } from '../../domain/folder.repository';
import { Folder } from '../../domain/folder';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';

export class FolderCreator {
  constructor(private readonly folderRepository: FolderRepository) {}

  async create(
    folder: Folder,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.FOLDERS, AuthPermission.CREATE);
    await this.folderRepository.save(folder);
    return ResponseMessage.createSuccessResponse(
      FolderCreator.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_CREATED.replace(
      '{{elemento}}',
      'el expediente',
    );
  }
}
