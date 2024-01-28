import { PermissionResponse } from '../../../permissions/application/response/permission.response';

export interface RoleResponse {
  id: string;
  name: string;
  description: string;
  permissions: PermissionResponse[];
}

export interface RoleByIdResponse {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}
