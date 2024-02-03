import { Role } from '../../../roles/domain/role';
export interface UserResponse {
  id: string;
  name: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UserResponseWithRole {
  id: string;
  name: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password: string;
  roles: Role[];
}
