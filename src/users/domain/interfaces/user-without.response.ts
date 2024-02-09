import { UserResponse } from './user.response';
import { RoleResponse } from '../../../roles/domain/interfaces/role.response';

export interface UserWithoutResponse extends Omit<UserResponse, 'password'> {}
export interface UserWithoutWithRoleResponse
  extends Omit<UserResponse, 'password' | 'roles'> {
  roles: RoleResponse[];
}
