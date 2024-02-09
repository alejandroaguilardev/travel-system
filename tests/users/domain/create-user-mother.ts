import { CreateUserRequest } from '../../../src/users/application/create/create-user-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { EmailMother } from '../../common/domain/email-mother';
import { PasswordMother } from './password-mother';
import { ProfileMother } from './profile.mother';
import { UserWithoutWithRoleResponse } from '../../../src/users/domain/interfaces/user-without.response';

export class UserCreatorMother {
  static create(newUser?: Partial<CreateUserRequest>): CreateUserRequest {
    return {
      id: newUser?.id ?? UuidMother.create(),
      profile: newUser?.profile ?? ProfileMother.create(),
      email: newUser?.email ?? EmailMother.create(),
      password: newUser?.password ?? PasswordMother.create(),
      roles: newUser?.roles ?? [],
      auth: newUser?.auth,
    };
  }

  static createWithPassword(
    newUser?: Partial<UserWithoutWithRoleResponse>,
  ): UserWithoutWithRoleResponse {
    return {
      id: newUser?.id ?? UuidMother.create(),
      profile: newUser?.profile ?? ProfileMother.create(),
      email: newUser?.email ?? EmailMother.create(),
      roles: newUser?.roles ?? [],
      auth: newUser?.auth ?? {
        admin: true,
        rememberToken: '',
        lastLogin: new Date(),
      },
    };
  }
}
