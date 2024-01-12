import { PermissionRepository } from '../../domain/permission.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { PermissionResponse } from '../response/permission.response';
import { InvalidArgumentError } from '../../../common/domain/value-object/invalid-argument-error';

export class PermissionFind {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async find(id: string): Promise<PermissionResponse | null> {
    const uuid = new Uuid(id);
    const permission =
      await this.permissionRepository.searchById<PermissionResponse>(uuid);
    if (!permission) {
      throw new InvalidArgumentError(
        'Permiso no encontrado: El sistema no pudo hallar el permiso especificado',
        400,
        'not_found',
      );
    }
    return permission;
  }
}
