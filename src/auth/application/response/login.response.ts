import { UserWithoutResponse } from '../../../users/application/response/user-without.response';

export interface LoginResponse {
  user: UserWithoutResponse;
  token: string;
}
