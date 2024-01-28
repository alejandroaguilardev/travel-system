import { Uuid } from '../../common/domain/value-object/uuid';
import { PermissionName } from './permission-name';
import { PermissionDescription } from './permission-description';
import { PermissionGroup } from './permission-group';

export class Permission {
  constructor(
    readonly id: Uuid,
    readonly name: PermissionName,
    readonly description: PermissionDescription,
    readonly group: PermissionGroup,
  ) {}

  toJson() {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      group: this.group.value,
    };
  }
}
