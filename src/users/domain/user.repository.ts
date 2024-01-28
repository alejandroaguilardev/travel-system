import { Repository } from '../../common/domain/repository';
import { User } from './user';
import { UserEmail } from './user-email';
import { UserResponse } from '../application/response/user.response';
import { Uuid } from '../../common/domain/value-object/uuid';

export interface UserRepository extends Repository<User> {
  searchEmail(email: UserEmail): Promise<UserResponse | null>;
  searchByIdWithRole(uuid: Uuid): Promise<UserResponse | null>;
}
