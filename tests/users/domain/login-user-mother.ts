import { LoginUserRequest } from '../../../src/auth/application/login/login-user-request';
import { PasswordMother } from './password-mother';
import { NumberMother } from '../../common/domain/number.mother';

export class LoginUserMother {
  static create(email?: string, password?: string): LoginUserRequest {
    return {
      document: email ?? 'D.N.I',
      documentNumber: email ?? NumberMother.create(),
      password: password ?? PasswordMother.create(),
    };
  }
}
