import {
  UserWithoutWithRoleResponse,
} from '../../domain/interfaces/user-without.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';

export class ErrorAccess {

  static permission(user: UserWithoutWithRoleResponse, permission: AuthPermission) {
    let errors: any;
    let flag = false;
    try {
      PermissionValidator.execute(user, AuthGroup.USERS, permission);
      flag = true;
    } catch (error) {
      errors = error;
    }
    try {
      PermissionValidator.execute(user, AuthGroup.CLIENT, permission);
      flag = true;
    } catch (error) {
      errors = error;
    }

    if (!flag) {
      throw errors;
    }
  }
}
