import { TravelPetPerChargeInterface } from '../../interfaces';
import { TravelName } from './accompanied-pet/travel-name';
import { TravelEmail } from './travel-email';
import { TravelPhone } from './travel-phone';
import { TravelDocumentNumber } from './travel-document-number';
import { TravelDocument } from './travel-document';

export class TravelPetPerCharge {
  constructor(
    readonly name: TravelName,
    readonly document: TravelDocument,
    readonly documentNumber: TravelDocumentNumber,
    readonly email: TravelEmail,
    readonly phone: TravelPhone,
  ) {}

  toJson(): TravelPetPerChargeInterface {
    return {
      name: this.name.value,
      document: this.document.value,
      documentNumber: this.documentNumber.value,
      phone: this.phone.value,
      email: this.email.value,
    };
  }
}
