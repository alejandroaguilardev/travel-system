import { RoleRepository } from '../../domain/role.repository';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { RoleUpdaterRequest } from './role-updater-request';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { RoleFactory } from '../../domain/role.factory';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { RoleResponse } from '../response/role.response';
import { InvalidArgumentError } from '../../../common/domain/value-object/invalid-argument-error';

export class RoleUpdater {
  constructor(private readonly roleRepository: RoleRepository) {}

  async update(
    id: string,
    roleRequest: RoleUpdaterRequest,
  ): Promise<ResponseSuccess> {
    const uuid = new Uuid(id);
    const response = await this.roleRepository.searchById<RoleResponse>(uuid);

    if (!response) {
      throw new InvalidArgumentError(
        'Rol no encontrado: El sistema no pudo hallar el permiso especificado',
        400,
        'not_found',
      );
    }

    const roleUpdate = RoleFactory.update(
      roleRequest,
      RoleFactory.create(response),
    );

    await this.roleRepository.update(uuid, roleUpdate);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
