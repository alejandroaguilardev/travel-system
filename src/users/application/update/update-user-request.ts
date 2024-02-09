import { CreateUserRequest } from '../create/create-user-request';

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}
