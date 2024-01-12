import { PermissionRepository } from '../../domain/permission.repository';
import { CreatePermission } from './create-permission';
import { PermissionFactory } from '../../domain/permission.factory';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';

export class PermissionCreator {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(createPermission: CreatePermission): Promise<ResponseSuccess> {
    const newPermission = PermissionFactory.create(createPermission);
    await this.permissionRepository.save(newPermission);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
