import { Permission } from './permission';
import { Uuid } from '../../common/domain/value-object/uuid';
import { PermissionName } from './permission-name';
import { PermissionDescription } from './permission-description';

interface FromData {
  id: string;
  name: string;
  description: string;
}

export class PermissionFactory {
  static create(fromData: FromData) {
    return new Permission(
      new Uuid(fromData.id),
      new PermissionName(fromData.name),
      new PermissionDescription(fromData.description),
    );
  }

  static update(fromData: Partial<FromData>, permission: Permission) {
    return new Permission(
      permission.id,
      fromData.name ? new PermissionName(fromData.name) : permission.name,
      fromData.description
        ? new PermissionDescription(fromData.description)
        : permission.description,
    );
  }
}
