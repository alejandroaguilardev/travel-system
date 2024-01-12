import { RoleRepository } from '../../domain/role.repository';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';

export class RoleRemover {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<ResponseSuccess> {
    const uuid = new Uuid(id);

    await this.roleRepository.remove(uuid);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_DELETED,
    );
  }
}
