import { UserCreatorRequest } from '../../../src/users/application/create/create-user-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { EmailMother } from '../../common/domain/email-mother';
import { FirstNameMother } from './first-name-mother';
import { LastNameMother } from './last-name-mother';
import { PasswordMother } from './password-mother';

export class UserCreatorMother {
  static create(newUser?: Partial<UserCreatorRequest>): UserCreatorRequest {
    const {
      id,
      name,
      secondName,
      lastName,
      secondLastName,
      email,
      password,
      roles,
    } = newUser ?? {};
    return {
      id: id ?? UuidMother.create(),
      name: name ?? FirstNameMother.create(),
      secondName: secondName ?? FirstNameMother.create(),
      lastName: lastName ?? LastNameMother.create(),
      secondLastName: secondLastName ?? LastNameMother.create(),
      email: email ?? EmailMother.create(),
      password: password ?? PasswordMother.create(),
      roles: roles ?? [UuidMother.create()],
    };
  }
}
