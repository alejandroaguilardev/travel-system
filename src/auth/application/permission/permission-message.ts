import { AuthGroup } from '../../../common/domain/auth-permissions';

export class PermissionMessage {
  static create(group: AuthGroup) {
    return `No tiene permiso para crear ${group}`;
  }

  static edit(group: AuthGroup) {
    return `No tiene permiso para editar ${group}`;
  }

  static delete(group: AuthGroup) {
    return `No tiene permiso para eliminar ${group}`;
  }

  static read(group: AuthGroup) {
    return `No tiene permiso para leer ${group}`;
  }
  static list(group: AuthGroup) {
    return `No tiene permiso para listar ${group}`;
  }
}
