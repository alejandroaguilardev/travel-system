import { UserInterface } from './user.interface';
import { RoleResponse } from '../../../roles/domain/interfaces/role.response';

export interface UserResponse extends UserInterface {}

export interface UserResponseWithRole extends Omit<UserInterface, 'roles'> {
  id: string;
  name: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password: string;
  roles: RoleResponse[];
}
