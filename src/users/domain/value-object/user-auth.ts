import { UserAuthInterface } from '../interfaces/user-auth.interface';
import { UserAuthAdmin } from './auth/user-auth-admin';
import { UserLastLogin } from './auth/user-last-login';
import { UserAuthRemember } from './auth/user-remember-token';

export class UserAuth {
  constructor(
    public admin: UserAuthAdmin,
    readonly rememberToken: UserAuthRemember,
    readonly lastLogin: UserLastLogin,
  ) {}

  toJson(): UserAuthInterface {
    return {
      admin: this.admin.value,
      rememberToken: this.rememberToken.value,
      lastLogin: this.lastLogin.value,
    };
  }

  setAdmin(admin: UserAuthAdmin) {
    return (this.admin = admin);
  }
}
