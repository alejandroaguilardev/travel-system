import { Repository } from '../../common/domain/repository';
import { User } from './user';
import { UserEmail } from './value-object/user-email';
import { UserResponse, UserResponseWithRole } from './interfaces/user.response';
import { Uuid } from '../../common/domain/value-object/uuid';
import { UserPassword } from './value-object/user-password';

export interface UserRepository extends Repository<User> {
  searchEmail(email: UserEmail): Promise<UserResponse | null>;
  updatePassword(
    uuid: Uuid,
    password: UserPassword,
  ): Promise<UserResponse | null>;
  searchByIdWithRole(uuid: Uuid): Promise<UserResponseWithRole | null>;
}
