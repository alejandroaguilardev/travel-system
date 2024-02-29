import { UserDocumentNumber } from '../../../domain/value-object/profile/user-document-number';
import { UserDocument } from '../../../domain/value-object/profile/user-document';
import { UserProfile } from '../../../domain/value-object/user-profile';
import { UserFirstName } from '../../../domain/value-object/profile/user-first-name';
import { UserSecondName } from '../../../domain/value-object/profile/user-second-name';
import { UserBirthDate } from '../../../domain/value-object/profile/user-birth-date';
import { UserDepartment } from '../../../domain/value-object/profile/user-department';
import { UserDirection } from '../../../domain/value-object/profile/user-direction';
import { UserDistrict } from '../../../domain/value-object/profile/user-district';
import { UserGender } from '../../../domain/value-object/profile/user-gender';
import { UserLastName } from '../../../domain/value-object/profile/user-last-name';
import { UserPhone } from '../../../domain/value-object/profile/user-phone';
import { UserProvince } from '../../../domain/value-object/profile/user-province';
import { UserSecondLastName } from '../../../domain/value-object/profile/user-second-last-name';
import { ProfileInterface } from '../../../domain/interfaces/profile.interface';

export class CommandProfileUser {
  static execute(profile: ProfileInterface): UserProfile {
    return new UserProfile(
      new UserDocument(profile.document),
      new UserDocumentNumber(profile.documentNumber),
      new UserFirstName(profile.name),
      new UserSecondName(profile.secondName),
      new UserLastName(profile.lastName),
      new UserSecondLastName(profile.secondLastName),
      new UserPhone(profile.phone),
      new UserGender(profile.gender),
      new UserBirthDate(profile.birthDate),
      new UserDepartment(profile.department),
      new UserProvince(profile.province),
      new UserDistrict(profile.district),
      new UserDirection(profile.direction),
    );
  }
}
