import { CreateUserRequest } from './create-user-request';
import { UserProfile } from '../../domain/value-object/user-profile';
import { UserFirstName } from '../../domain/value-object/profile/user-first-name';
import { UuidOptional } from '../../../common/domain/value-object/uuid-optional-value-object';
import { StatusValueObject } from '../../../common/domain/value-object/status-value-object';
import { UserSecondLastName } from '../../domain/value-object/profile/user-second-last-name';
import { UserLastName } from '../../domain/value-object/profile/user-last-name';
import { UserPhone } from '../../domain/value-object/profile/user-phone';
import { UserGender } from '../../domain/value-object/profile/user-gender';
import { UserBirthDate } from '../../domain/value-object/profile/user-birth-date';
import { UserDepartment } from '../../domain/value-object/profile/user-department';
import { UserProvince } from '../../domain/value-object/profile/user-province';
import { UserDistrict } from '../../domain/value-object/profile/user-district';
import { UserDirection } from '../../domain/value-object/profile/user-direction';
import { UserSecondName } from '../../domain/value-object/profile/user-second-name';
import { UserAuth } from '../../domain/value-object/user-auth';
import { User } from '../../domain/user';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserEmail } from '../../domain/value-object/user-email';
import { UserPassword } from '../../domain/value-object/user-password';
import { UserRole } from '../../domain/value-object/user-role';
import { UserAuthAdmin } from '../../domain/value-object/auth/user-auth-admin';
import { UserAuthRemember } from '../../domain/value-object/auth/user-remember-token';
import { UserLastLogin } from '../../domain/value-object/auth/user-last-login';

export class CommandCreatorUser {
  static execute(data: CreateUserRequest, userId: string): User {
    return new User(
      new Uuid(data.id),
      new UserEmail(data.email),
      new UserPassword(''),
      new UserRole(data.roles),
      new UserProfile(
        new UserFirstName(data.profile.name),
        new UserSecondName(data.profile.secondName),
        new UserLastName(data.profile.lastName),
        new UserSecondLastName(data.profile.secondLastName),
        new UserPhone(data.profile.phone),
        new UserGender(data.profile.gender),
        new UserBirthDate(data.profile.birthDate),
        new UserDepartment(data.profile.department),
        new UserProvince(data.profile.province),
        new UserDistrict(data.profile.district),
        new UserDirection(data.profile.direction),
      ),
      new StatusValueObject('active'),
      new UuidOptional(userId),
      new UserAuth(
        new UserAuthAdmin(false),
        new UserAuthRemember(''),
        new UserLastLogin(null),
      ),
    );
  }
}
