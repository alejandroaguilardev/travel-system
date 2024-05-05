import { TravelInterface, StatusInterface } from '../interfaces';
import { ContractHasServiceIncluded } from './contract-has-service.included';
import { ContractStatusDetail } from '../../../common/domain/value-object/contract-status-detail';
import {
  ContractHasServiceAccompanied,
  ContractTypeTraveling,
  TravelAirlineReservation,
  TravelPetPerCharge,
} from './travel';
import { TravelDestination } from './travel/destination/travel-destination';
import { TravelAccompaniedPet } from './travel/accompanied-pet/travel-accompanied-pet';
import { ContractGuideNumber } from './contract-guide-number';
import { TravelObservation } from './travel/travel-observation';

export class ContractTravel {
  constructor(
    readonly status: ContractStatusDetail,
    public hasServiceIncluded: ContractHasServiceIncluded,
    readonly hasServiceAccompanied: ContractHasServiceAccompanied,
    public typeTraveling: ContractTypeTraveling,
    readonly airlineReservation: TravelAirlineReservation,
    readonly petPerCharge: TravelPetPerCharge,
    readonly accompaniedPet: TravelAccompaniedPet,
    readonly destination: TravelDestination,
    readonly guideNumber: ContractGuideNumber,
    readonly observation: TravelObservation,
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
      observation: this.observation.value,
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
      TravelAccompaniedPet.hasRequiredAccompaniedPetFields(
        travelData.accompaniedPet,
      );

    const hasRequiredDestinationFields: boolean =
      TravelDestination.hasRequiredDestinationFields(travelData.destination);

    const hasRequired =
      hasRequiredAirlineReservationFields &&
      hasRequiredDestinationFields &&
      hasRequiredAccompaniedPetFields;

    if (!hasRequired) return 'pending';
    if (this.typeTraveling.value === 'charge') {
      const hasRequiredPetChargeFields: boolean =
        TravelPetPerCharge.hasRequiredPetChargeFields(
          travelData.petPerCharge,
        ) && !!travelData.guideNumber;

      return hasRequiredPetChargeFields ? 'completed' : 'in-process';
    } else {
      return 'completed';
    }
  }
}
