import {
  TravelInterface,
  StatusInterface,
  TravelAccompaniedPetInterface,
  TravelDestinationInterface,
  TravelPetPerChargeInterface,
} from '../interfaces';
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
      ContractTravel.hasRequiredAccompaniedPetFields(travelData.accompaniedPet);

    const hasRequiredDestinationFields: boolean =
      ContractTravel.hasRequiredDestinationFields(travelData.destination);

    const hasRequired =
      hasRequiredAirlineReservationFields &&
      hasRequiredDestinationFields &&
      hasRequiredAccompaniedPetFields;

    if (!hasRequired) return 'pending';
    if (this.typeTraveling.value === 'charge') {
      const hasRequiredPetChargeFields: boolean =
        ContractTravel.hasRequiredPetChargeFields(travelData.petPerCharge) &&
        !!travelData.guideNumber;

      return hasRequiredPetChargeFields ? 'completed' : 'in-process';
    } else {
      return 'completed';
    }
  }

  static hasRequiredAccompaniedPetFields(
    accompaniedPet: TravelAccompaniedPetInterface,
  ): boolean {
    return (
      !!accompaniedPet.name &&
      !!accompaniedPet.document &&
      !!accompaniedPet.documentNumber &&
      !!accompaniedPet.phone &&
      !!accompaniedPet.email &&
      !!accompaniedPet.department &&
      !!accompaniedPet.province &&
      !!accompaniedPet.district &&
      !!accompaniedPet.direction
    );
  }

  static hasRequiredDestinationFields(
    destination: TravelDestinationInterface,
  ): boolean {
    return (
      !!destination.cityDestination &&
      !!destination.countryDestination &&
      !!destination.directionDestination
    );
  }

  static hasRequiredPetChargeFields(
    petPerCharge: TravelPetPerChargeInterface,
  ): boolean {
    return (
      !!petPerCharge.name &&
      !!petPerCharge.document &&
      !!petPerCharge.documentNumber &&
      !!petPerCharge.phone &&
      !!petPerCharge.email
    );
  }
}
