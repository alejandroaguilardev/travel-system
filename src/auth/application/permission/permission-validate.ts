import { ErrorNotAuthorization } from '../../../common/domain/errors/error-not-authorization';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionMessage } from './permission-message';
import { RoleResponse } from '../../../roles/domain/interfaces/role.response';

export class PermissionValidator {
  static execute(
    user: UserWithoutWithRoleResponse,
    group: AuthGroup,
    permission: AuthPermission,
  ) {
    const hasPermission = this.hasPermission(user, group, permission);
    const isAdmin = this.isAdmin(user);
    if (!hasPermission && !isAdmin) {
      throw new ErrorNotAuthorization(
        PermissionMessage.create(group, permission),
      );
    }
  }

  private static isAdmin(user: UserWithoutWithRoleResponse): boolean {
    return !!user?.auth?.admin;
  }
  private static hasPermission(
    user: UserWithoutWithRoleResponse,
    group: string,
    permission: string,
  ): boolean {
    return user.roles.some((role) =>
      this.hasMatchingPermission(role, group, permission),
    );
  }

  private static hasMatchingPermission(
    role: RoleResponse,
    group: string,
    permission: string,
  ): boolean {

    return role.permissions.some(
      (p) => p.group?.toLowerCase() === group?.toLowerCase() && p.name?.toLowerCase() === permission?.toLowerCase(),
    );
  }
}
