import { UserWithoutResponse } from '../../../users/domain/interfaces/user-without.response';

export interface LoginResponse {
  user: UserWithoutResponse;
  token: string;
}
