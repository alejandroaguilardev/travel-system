import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { RoleRepository } from '../../domain/role.repository';
import { RoleFactory } from '../../domain/role.factory';
import { RoleCreatorRequest } from './role-creator-request';

export class RoleCreator {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(roleRequest: RoleCreatorRequest): Promise<ResponseSuccess> {
    const role = RoleFactory.create(roleRequest);

    await this.roleRepository.save(role);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
