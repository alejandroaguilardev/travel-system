import { LoginUserRequest } from '../../../src/auth/application/login/login-user-request';
import { EmailMother } from '../../common/domain/email-mother';
import { PasswordMother } from '../../users/domain/password-mother';

export class LoginUserMother {
  static create(email?: string, password?: string): LoginUserRequest {
    return {
      email: email ?? EmailMother.create(),
      password: password ?? PasswordMother.create(),
    };
  }
}
