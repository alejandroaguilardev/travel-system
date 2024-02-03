import { TravelInterface, StatusInterface } from '../../interfaces';
import { ContractHasServiceIncluded } from '../contract-has-service.included';
import { ContractStatus } from '../contract-status';
import {
  ContractHasServiceAccompanied,
  ContractTypeTraveling,
  TravelAirlineReservation,
  TravelPetPerCharge,
} from './travel';

export class ContractTravel {
  constructor(
    readonly status: ContractStatus,
    public hasServiceIncluded: ContractHasServiceIncluded,
    readonly hasServiceAccompanied: ContractHasServiceAccompanied,
    public typeTraveling: ContractTypeTraveling,
    readonly airlineReservation: TravelAirlineReservation,
    readonly petPerCharge: TravelPetPerCharge,
  ) {}

  toJson(): TravelInterface {
    return {
      status: this.status.value as StatusInterface,
      hasServiceIncluded: this.hasServiceIncluded.value,
      hasServiceAccompanied: this.hasServiceAccompanied.value,
      typeTraveling: this.typeTraveling.value,
      airlineReservation: this.airlineReservation.toJson(),
      petPerCharge: this.petPerCharge.toJson(),
    };
  }

  setHasServiceIncluded(healthCertificate: boolean) {
    return (this.hasServiceIncluded = new ContractHasServiceIncluded(
      healthCertificate,
    ));
  }

  setAirlineReservation() {
    const hasRequiredAirlineReservationFields =
      this.airlineReservation.arrivalDate.value &&
      this.airlineReservation.code.value &&
      this.airlineReservation.departureAirport.value &&
      this.airlineReservation.departureDate.value &&
      this.airlineReservation.destinationAirport.value &&
      this.airlineReservation.flightNumber.value;

    if (hasRequiredAirlineReservationFields) {
      if (this.typeTraveling.value === 'charge') {
        const hasRequiredPetChargeFields =
          this.petPerCharge.receptor &&
          this.petPerCharge.phone &&
          this.petPerCharge.pickupDateTime &&
          this.petPerCharge.pickupLocation;

        this.status.value = hasRequiredPetChargeFields
          ? 'completed'
          : 'in-process';
      } else {
        this.status.value = 'completed';
      }
    }
  }
}
