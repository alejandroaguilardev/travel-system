import { Uuid } from '../../../common/domain/value-object';
import { PermissionDescription } from '../../domain/permission-description';
import { PermissionGroup } from '../../domain/permission-group';
import { PermissionName } from '../../domain/permission-name';
import { Permission } from '../../domain/permission';
import { CreatePermissionRequest } from './create-permission';

export class CommandPermissionCreate {
  static execute(fromData: CreatePermissionRequest) {
    return new Permission(
      new Uuid(fromData.id),
      new PermissionName(fromData.name),
      new PermissionDescription(fromData.description),
      new PermissionGroup(fromData.group),
    );
  }
}
