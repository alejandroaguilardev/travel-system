import { ProfileInterface } from '../interfaces/profile.interface';
import { UserBirthDate } from './profile/user-birth-date';
import { UserDepartment } from './profile/user-department';
import { UserDirection } from './profile/user-direction';
import { UserDistrict } from './profile/user-district';
import { UserFirstName } from './profile/user-first-name';
import { UserGender } from './profile/user-gender';
import { UserLastName } from './profile/user-last-name';
import { UserPhone } from './profile/user-phone';
import { UserProvince } from './profile/user-province';
import { UserSecondLastName } from './profile/user-second-last-name';
import { UserSecondName } from './profile/user-second-name';

export class UserProfile {
  constructor(
    readonly name: UserFirstName,
    readonly secondName: UserSecondName,
    readonly lastName: UserLastName,
    readonly secondLastName: UserSecondLastName,

    readonly phone: UserPhone,
    readonly gender: UserGender, // quitar

    readonly birthDate: UserBirthDate, // quitar

    readonly department: UserDepartment, // quitar
    readonly province: UserProvince, // quitar
    readonly district: UserDistrict, // quitar
    readonly direction: UserDirection, // quitar
  ) {}

  toJson(): ProfileInterface {
    return {
      name: this.name.value,
      secondName: this.secondName.value,
      lastName: this.lastName.value,
      secondLastName: this.secondLastName.value,
      phone: this.phone.value,
      gender: this.gender.value,
      birthDate: this.birthDate.value,
      department: this.department.value,
      province: this.province.value,
      district: this.district.value,
      direction: this.direction.value,
    };
  }
}
