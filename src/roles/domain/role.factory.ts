import { Role } from './role';
import { Uuid } from '../../common/domain/value-object/uuid';
import { RoleName } from './role-name';
import { RoleDescription } from './role-description';
import { RolePermissions } from './role-permissions';

interface FromData {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export class RoleFactory {
  static create(fromData: FromData): Role {
    return new Role(
      new Uuid(fromData.id),
      new RoleName(fromData.name),
      new RoleDescription(fromData.description),
      new RolePermissions(fromData.permissions),
    );
  }

  static update(fromData: Partial<FromData>, role: Role) {
    return new Role(
      role.id,
      fromData.name ? new RoleName(fromData.name) : role.name,
      fromData.description
        ? new RoleDescription(fromData.description)
        : role.description,
      fromData.permissions
        ? new RolePermissions(fromData.permissions)
        : role.permissions,
    );
  }
}
