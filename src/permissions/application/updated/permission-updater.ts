import { PermissionRepository } from '../../domain/permission.repository';
import { UpdatePermissionRequest } from './update-permission';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { PermissionFactory } from '../../domain/permission.factory';
import { InvalidArgumentError } from '../../../common/domain/value-object/invalid-argument-error';
import { PermissionResponse } from '../response/permission.response';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';

export class PermissionUpdater {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async update(
    id: string,
    updatePermissionRequest: UpdatePermissionRequest,
  ): Promise<ResponseSuccess> {
    const uuid = new Uuid(id);

    const response =
      await this.permissionRepository.searchById<PermissionResponse>(uuid);
    if (!response) {
      throw new InvalidArgumentError(
        'Permiso no encontrado: El sistema no pudo hallar el permiso especificado',
        400,
        'not_found',
      );
    }

    const updatePermission = PermissionFactory.update(
      updatePermissionRequest,
      PermissionFactory.create(response),
    );

    await this.permissionRepository.update(uuid, updatePermission);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
