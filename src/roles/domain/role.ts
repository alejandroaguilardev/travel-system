import { Uuid } from '../../common/domain/value-object/uuid';
import { RoleDescription } from './role-description';
import { RoleName } from './role-name';
import { RolePermissions } from './role-permissions';
export class Role {
  constructor(
    readonly id: Uuid,
    readonly name: RoleName,
    readonly description: RoleDescription,
    readonly permissions: RolePermissions,
  ) {}

  toJson() {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      permissions: this.permissions.toPrimitive(),
    };
  }
}
