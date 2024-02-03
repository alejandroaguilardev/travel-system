import { UserResponse } from './user.response';
import { Role } from '../../../roles/domain/role';

export interface UserWithoutResponse extends Omit<UserResponse, 'password'> {}
export interface UserWithoutWithRoleResponse
  extends Omit<UserResponse, 'password' | 'roles'> {
  roles: Role[];
}
