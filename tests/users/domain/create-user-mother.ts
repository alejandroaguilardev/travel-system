import { CreateUserRequest } from '../../../src/users/application/create/create-user-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { EmailMother } from '../../common/domain/email-mother';
import { FirstNameMother } from './first-name-mother';
import { LastNameMother } from './last-name-mother';
import { PasswordMother } from './password-mother';
import { UserWithoutWithRoleResponse } from 'src/users/application/response/user-without.response';
import { ProfileMother } from './profile.mother';

export class UserCreatorMother {
  static create(newUser?: Partial<CreateUserRequest>): CreateUserRequest {
    return {
      id: newUser?.id ?? UuidMother.create(),
      profile: newUser?.profile ?? ProfileMother.create(),
      email: newUser?.email ?? EmailMother.create(),
      password: newUser?.password ?? PasswordMother.create(),
      roles: newUser?.roles ?? [],
    };
  }

  static createWithPassword(
    newUser?: Partial<UserWithoutWithRoleResponse>,
  ): UserWithoutWithRoleResponse {
    const { id, name, secondName, lastName, secondLastName, email, roles } =
      newUser ?? {};
    return {
      id: id ?? UuidMother.create(),
      name: name ?? FirstNameMother.create(),
      secondName: secondName ?? FirstNameMother.create(),
      lastName: lastName ?? LastNameMother.create(),
      secondLastName: secondLastName ?? LastNameMother.create(),
      email: email ?? EmailMother.create(),
      roles: roles ?? [],
    };
  }
}
