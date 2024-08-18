import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export interface LoginResponse {
  user: UserWithoutWithRoleResponse;
  token: string;
}
