import { TravelInterface, StatusInterface } from '../interfaces';
import { ContractHasServiceIncluded } from './contract-has-service.included';
import { ContractStatus } from '../../../common/domain/value-object/contract-status';
import {
  ContractHasServiceAccompanied,
  ContractTypeTraveling,
  TravelAirlineReservation,
  TravelPetPerCharge,
} from './travel';
import { TravelDestination } from './travel/destination/travel-destination';
import { TravelAccompaniedPet } from './travel/accompanied-pet/travel-accompanied-pet';

export class ContractTravel {
  constructor(
    readonly status: ContractStatus,
    public hasServiceIncluded: ContractHasServiceIncluded,
    readonly hasServiceAccompanied: ContractHasServiceAccompanied,
    public typeTraveling: ContractTypeTraveling,
    readonly airlineReservation: TravelAirlineReservation,
    readonly petPerCharge: TravelPetPerCharge,
    readonly accompaniedPet: TravelAccompaniedPet,
    readonly destination: TravelDestination,
  ) {}

  toJson(): TravelInterface {
    return {
      status: this.status.value as StatusInterface,
      hasServiceIncluded: this.hasServiceIncluded.value,
      hasServiceAccompanied: this.hasServiceAccompanied.value,
      typeTraveling: this.typeTraveling.value,
      airlineReservation: this.airlineReservation.toJson(),
      petPerCharge: this.petPerCharge.toJson(),
      accompaniedPet: this.accompaniedPet.toJson(),
      destination: this.destination.toJson(),
    };
  }

  setHasServiceIncluded(healthCertificate: boolean) {
    return (this.hasServiceIncluded = new ContractHasServiceIncluded(
      healthCertificate,
    ));
  }

  statusCompleted() {
    const hasRequiredAirlineReservationFields =
      this.airlineReservation.arrivalDate.value &&
      this.airlineReservation.code.value &&
      this.airlineReservation.departureAirport.value &&
      this.airlineReservation.departureDate.value &&
      this.airlineReservation.destinationAirport.value &&
      this.airlineReservation.flightNumber.value;

    const hasRequiredAccompaniedPetFields =
      this.accompaniedPet.name.value &&
      this.accompaniedPet.document.value &&
      this.accompaniedPet.documentNumber.value &&
      this.accompaniedPet.phone.value &&
      this.accompaniedPet.email.value &&
      this.accompaniedPet.department.value &&
      this.accompaniedPet.province.value &&
      this.accompaniedPet.district.value &&
      this.accompaniedPet.direction.value;

    const hasRequiredDestinationFields =
      this.destination.cityDestination.value &&
      this.destination.countryDestination.value &&
      this.destination.directionDestination.value;

    const hasRequired =
      hasRequiredAirlineReservationFields &&
      hasRequiredDestinationFields &&
      hasRequiredAccompaniedPetFields;

    if (hasRequired) {
      if (this.typeTraveling.value === 'charge') {
        const hasRequiredPetChargeFields =
          this.petPerCharge.name.value &&
          this.petPerCharge.document.value &&
          this.petPerCharge.documentNumber.value &&
          this.petPerCharge.phone.value &&
          this.petPerCharge.email.value;

        this.status.value = hasRequiredPetChargeFields
          ? 'completed'
          : 'in-process';
      } else {
        this.status.value = 'completed';
      }
    }
  }
}
