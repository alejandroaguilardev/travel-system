import { Repository } from '../../common/domain/repository';
import { User } from './user';
import { UserEmail } from './user-email';
import { UserResponse } from '../application/response/user.response';

export interface UserRepository extends Repository<User> {
  searchEmail(email: UserEmail): Promise<UserResponse | null>;
}
