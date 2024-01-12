import { UserEmail } from '../../users/domain/user-email';
import { UserPassword } from '../../users/domain/user-password';
import { Hashing } from '../../common/application/services/hashing';

export class UserAuth {
  constructor(
    readonly email: UserEmail,
    readonly password: UserPassword,
  ) {}

  passwordMatches(password: UserPassword, hashing: Hashing): boolean {
    return hashing.comparePasswords(this.password.value, password.value);
  }
}
