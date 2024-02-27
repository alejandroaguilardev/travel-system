import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class PermissionMessage {
  static create(group: AuthGroup, permission: AuthPermission) {
    return `No tiene permiso para ${permission} ${group}`;
  }
}
