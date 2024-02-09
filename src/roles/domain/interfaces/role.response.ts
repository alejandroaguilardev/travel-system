import { PermissionInterface } from '../../../permissions/domain/interfaces/permission.interface';

export interface RoleResponse {
  id: string;
  name: string;
  description: string;
  permissions: PermissionInterface[];
}
