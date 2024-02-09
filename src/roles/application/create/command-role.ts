import { Role } from '../../domain/role';
import { Uuid } from '../../../common/domain/value-object';
import { RoleDescription } from '../../../roles/domain/role-description';
import { RoleName } from '../../../roles/domain/role-name';
import { RolePermissions } from '../../../roles/domain/role-permissions';
import { RoleCreatorRequest } from './role-creator-request';

export class CommandRole {
  static execute(fromData: RoleCreatorRequest): Role {
    return new Role(
      new Uuid(fromData.id),
      new RoleName(fromData.name),
      new RoleDescription(fromData.description),
      new RolePermissions(fromData.permissions),
    );
  }
}
