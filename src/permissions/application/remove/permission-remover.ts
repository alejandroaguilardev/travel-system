import { PermissionRepository } from '../../domain/permission.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';

export class PermissionRemover {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async remove(id: string): Promise<ResponseSuccess> {
    const uuid = new Uuid(id);
    await this.permissionRepository.remove(uuid);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_DELETED,
    );
  }
}
