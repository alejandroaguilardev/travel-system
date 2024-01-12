import { UserPassword } from './user-password';
import { Uuid } from '../../common/domain/value-object/uuid';
import { UserRole } from './user-role';
import { UserEmail } from './user-email';
import { UserFirstName } from './user-first-name';
import { UserSecondName } from './user-second-name';
import { UserLastName } from './user-last-name';
import { UserSecondLastName } from './user-second-last-name';

export class User {
  constructor(
    readonly id: Uuid,
    readonly name: UserFirstName,
    readonly secondName: UserSecondName,
    readonly lastName: UserLastName,
    readonly secondLastName: UserSecondLastName,
    readonly email: UserEmail,
    public password: UserPassword,
    readonly roles: UserRole,
  ) {}

  toJson() {
    return {
      id: this.id.value,
      name: this.name.value,
      secondName: this.secondName.value,
      lastName: this.lastName.value,
      secondLastName: this.secondLastName.value,
      email: this.email.value,
      password: this.password.value,
      roles: this.roles.toPrimitive(),
    };
  }

  setPassword(password: UserPassword) {
    this.password = password;
  }
}
