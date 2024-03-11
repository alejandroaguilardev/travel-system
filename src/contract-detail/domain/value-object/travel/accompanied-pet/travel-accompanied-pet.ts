import { TravelName } from '../accompanied-pet/travel-name';
import { TravelEmail } from '../travel-email';
import { TravelPhone } from '../travel-phone';
import { TravelAccompaniedPetInterface } from '../../../../domain/interfaces/travel.interface';
import { UserDistrict } from '../../../../../users/domain/value-object/profile/user-district';
import { UserProvince } from '../../../../../users/domain/value-object/profile/user-province';
import { UserDepartment } from '../../../../../users/domain/value-object/profile/user-department';
import { UserDirection } from '../../../../../users/domain/value-object/profile/user-direction';
import { TravelDocument } from '../travel-document';
import { TravelDocumentNumber } from '../travel-document-number';

export class TravelAccompaniedPet {
  constructor(
    readonly name: TravelName,
    readonly document: TravelDocument,
    readonly documentNumber: TravelDocumentNumber,
    readonly email: TravelEmail,
    readonly phone: TravelPhone,
    readonly direction: UserDirection,
    readonly district: UserDistrict,
    readonly province: UserProvince,
    readonly department: UserDepartment,
  ) {}

  toJson(): TravelAccompaniedPetInterface {
    return {
      name: this.name.value,
      document: this.document.value,
      documentNumber: this.documentNumber.value,
      phone: this.phone.value,
      email: this.email.value,
      direction: this.direction.value,
      district: this.district.value,
      province: this.province.value,
      department: this.department.value,
    };
  }
}
