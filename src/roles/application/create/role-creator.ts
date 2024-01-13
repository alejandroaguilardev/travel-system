import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { RoleRepository } from '../../domain/role.repository';
import { RoleFactory } from '../../domain/role.factory';
import { RoleCreatorRequest } from './role-creator-request';
import { ErrorDuplicateElement } from '../../../common/domain/errors/error-duplicate-element';

export class RoleCreator {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(roleRequest: RoleCreatorRequest): Promise<ResponseSuccess> {
    const role = RoleFactory.create(roleRequest);
    const response = await this.roleRepository.searchById(role.id);

    if (response) {
      throw new ErrorDuplicateElement('rol');
    }

    await this.roleRepository.save(role);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
