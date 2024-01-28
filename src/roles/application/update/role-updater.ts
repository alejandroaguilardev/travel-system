import { RoleRepository } from '../../domain/role.repository';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { RoleUpdaterRequest } from './role-updater-request';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { RoleFactory } from '../../domain/role.factory';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { RoleByIdResponse } from '../response/role.response';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';

export class RoleUpdater {
  constructor(private readonly roleRepository: RoleRepository) {}

  async update(
    id: string,
    roleRequest: RoleUpdaterRequest,
  ): Promise<ResponseSuccess> {
    const uuid = new Uuid(id);
    const response =
      await this.roleRepository.searchById<RoleByIdResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('rol'));
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
