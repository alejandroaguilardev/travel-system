import { UuidOptional } from '../../../../common/domain/value-object';
import { TravelEmail } from './travel-email';
import { TravelPhone } from './travel-phone';
import { TravelPickupDataTime } from './travel-pickup-date-time';
import { TravelPickupLocation } from './travel-pickup-location';
import { TravelReceptor } from './travel-receptor';
import { TravelSpecialRequests } from './travel-special-requests';

export class TravelPetPerCharge {
  constructor(
    readonly receptor: TravelReceptor,
    readonly email: TravelEmail,
    readonly phone: TravelPhone,
    readonly pickupDateTime: TravelPickupDataTime,
    readonly pickupLocation: TravelPickupLocation,
    readonly specialRequests: TravelSpecialRequests,
    readonly user: UuidOptional,
  ) {}

  toJson() {
    return {
      receptor: this.receptor.value,
      email: this.email.value,
      phone: this.phone.value,
      pickupDateTime: this.pickupDateTime.value,
      pickupLocation: this.pickupLocation.value,
      specialRequests: this.specialRequests.value,
      user: this.user.value,
    };
  }
}
