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
import { ContractGuideNumber } from './contract-guide-number';

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
    readonly guideNumber: ContractGuideNumber,
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
      guideNumber: this.guideNumber.value,
    };
  }

  setHasServiceIncluded(healthCertificate: boolean) {
    return (this.hasServiceIncluded = new ContractHasServiceIncluded(
      healthCertificate,
    ));
  }

  statusCompleted(travelData: TravelInterface) {
    const hasRequiredAirlineReservationFields: boolean =
      !!travelData.airlineReservation.arrivalDate &&
      !!travelData.airlineReservation.code &&
      !!travelData.airlineReservation.departureAirport &&
      !!travelData.airlineReservation.departureDate &&
      !!travelData.airlineReservation.destinationAirport &&
      !!travelData.airlineReservation.flightNumber;

    const hasRequiredAccompaniedPetFields: boolean =
      !!travelData.accompaniedPet.name &&
      !!travelData.accompaniedPet.document &&
      !!travelData.accompaniedPet.documentNumber &&
      !!travelData.accompaniedPet.phone &&
      !!travelData.accompaniedPet.email &&
      !!travelData.accompaniedPet.department &&
      !!travelData.accompaniedPet.province &&
      !!travelData.accompaniedPet.district &&
      !!travelData.accompaniedPet.direction;

    const hasRequiredDestinationFields: boolean =
      !!travelData.destination.cityDestination &&
      !!travelData.destination.countryDestination &&
      !!travelData.destination.directionDestination;

    const hasRequired =
      hasRequiredAirlineReservationFields &&
      hasRequiredDestinationFields &&
      hasRequiredAccompaniedPetFields;

    if (!hasRequired) return 'pending';
    if (this.typeTraveling.value === 'charge') {
      const hasRequiredPetChargeFields: boolean =
        !!travelData.petPerCharge.name &&
        !!travelData.petPerCharge.document &&
        !!travelData.petPerCharge.documentNumber &&
        !!travelData.petPerCharge.phone &&
        !!travelData.guideNumber &&
        !!travelData.petPerCharge.email;

      return hasRequiredPetChargeFields ? 'completed' : 'in-process';
    } else {
      return 'completed';
    }
  }
}
