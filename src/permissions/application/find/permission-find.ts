import { PermissionRepository } from '../../domain/permission.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { PermissionResponse } from '../response/permission.response';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';

export class PermissionFind {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async find(id: string): Promise<PermissionResponse | null> {
    const uuid = new Uuid(id);
    const permission =
      await this.permissionRepository.searchById<PermissionResponse>(uuid);
    if (!permission) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }
    return permission;
  }
}
