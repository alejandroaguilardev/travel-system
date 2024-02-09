import { UserPassword } from './value-object/user-password';
import { Uuid } from '../../common/domain/value-object/uuid';
import { UserEmail } from './value-object/user-email';
import { UserRole } from './value-object/user-role';
import { UserProfile } from './value-object/user-profile';
import { UuidOptional } from '../../common/domain/value-object/uuid-optional-value-object';
import { StatusValueObject } from '../../common/domain/value-object/status-value-object';
import { UserInterface } from './interfaces/user.interface';
import { UserAuth } from './value-object/user-auth';

export class User {
  constructor(
    readonly id: Uuid,
    readonly email: UserEmail,
    public password: UserPassword,
    readonly roles: UserRole,
    readonly profile: UserProfile,
    readonly status: StatusValueObject,
    readonly user: UuidOptional,
    readonly auth: UserAuth,
  ) {}

  toJson(): UserInterface {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
      roles: this.roles.toPrimitive(),
      profile: this.profile.toJson(),
      status: this.status.value,
      user: this.user.value,
      auth: this.auth.toJson(),
    };
  }

  setPassword(password: UserPassword) {
    this.password = password;
  }
}
