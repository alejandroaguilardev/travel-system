import { UserResponse } from './user.response';

export interface UserWithoutResponse extends Omit<UserResponse, 'password'> {}
