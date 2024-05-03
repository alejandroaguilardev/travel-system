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
import { UserDocument } from '../../domain/value-object/profile/user-document';
import { UserDocumentNumber } from '../../domain/value-object/profile/user-document-number';
import { UserIsAdvisor } from '../../domain/value-object/user-advisor';
import { UserIsDoctor } from '../../domain/value-object/user-is-doctor';
import { userLinkWhatsApp } from '../../domain/value-object/user-link-whats-app';

export class CommandCreatorUser {
  static execute(data: CreateUserRequest, userId: string): User {
    return new User(
      new Uuid(data.id),
      new UserEmail(data.email),
      new UserPassword(''),
      new UserRole(data.roles),
      new UserProfile(
        new UserDocument(data.profile.document),
        new UserDocumentNumber(data.profile.documentNumber),
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
        new UserAuthAdmin(
          data?.auth?.admin && data.auth.admin === true
            ? data.auth.admin
            : false,
        ),
        new UserAuthRemember(''),
        new UserLastLogin(null),
      ),
      new UserIsAdvisor(data?.isAdvisor ?? false),
      new UserIsDoctor(data?.isDoctor ?? false),
      new userLinkWhatsApp(data?.linkWhatsApp ?? ''),
    );
  }
}
