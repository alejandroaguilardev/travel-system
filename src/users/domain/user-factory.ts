import { Uuid } from '../../common/domain/value-object/uuid';
import { User } from './user';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';
import { UserEmail } from './user-email';
import { UserFirstName } from './user-first-name';
import { UserSecondName } from './user-second-name';
import { UserLastName } from './user-last-name';
import { UserSecondLastName } from './user-second-last-name';

type FromData = {
  id: string;
  name: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password: string;
  roles: string[];
};

export class UserFactory {
  static create(fromData: FromData): User {
    return new User(
      new Uuid(fromData.id),
      new UserFirstName(fromData.name),
      new UserSecondName(fromData.secondName),
      new UserLastName(fromData.lastName),
      new UserSecondLastName(fromData.secondLastName),
      new UserEmail(fromData.email),
      new UserPassword(fromData.password),
      new UserRole(fromData.roles),
    );
  }

  static update(fromData: Partial<FromData>, user: User): User {
    return new User(
      user.id,
      fromData?.name ? new UserFirstName(fromData.name) : user.name,
      fromData?.secondName
        ? new UserSecondName(fromData.secondName)
        : user.secondName,
      fromData?.lastName ? new UserLastName(fromData.lastName) : user.lastName,
      fromData?.secondLastName
        ? new UserSecondLastName(fromData.secondLastName)
        : user.secondLastName,
      fromData?.email ? new UserEmail(fromData.email) : user.email,
      fromData?.password ? new UserPassword(fromData.password) : user.password,
      fromData?.roles ? new UserRole(fromData.roles) : user.roles,
    );
  }
}
