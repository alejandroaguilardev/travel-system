import { UserCreatorRequest } from '../create/create-user-request';

export interface UpdateUserRequest extends Partial<UserCreatorRequest> {}
