import { ContractStatus } from '../contract-status';
import { ContractHasServiceIncluded } from '../contract-has-service.included';
import { TravelAirlineReservation } from './travel/travel-airline-reservation';
import { TravelPetPerCharge } from './travel/travel-pet-per-charge';
import { TypeTraveling } from './travel/type-traveling';
import { TravelDefinition } from '../../interfaces/travel';
import { StatusDefinition } from '../../interfaces/status';
import { ContractResponse } from '../../../application/response/contract.response';
import { ContractDefinition } from '../../interfaces/contract';

export class ContractTravel {
  constructor(
    readonly status: ContractStatus,
    public hasServiceIncluded: ContractHasServiceIncluded,
    public typeTraveling: TypeTraveling,
    readonly airlineReservation: TravelAirlineReservation,
    readonly petPerCharge: TravelPetPerCharge,
  ) {}

  toJson(): TravelDefinition {
    return {
      status: this.status.value as StatusDefinition,
      hasServiceIncluded: this.hasServiceIncluded.value,
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

  static setAirlineReservation(
    contract: ContractResponse,
    travel: TravelDefinition,
  ): ContractDefinition {
    contract.services.travel.airlineReservation = travel.airlineReservation;
    if (contract.services.travel.typeTraveling === 'charge') {
      contract.services.travel.petPerCharge = travel.petPerCharge;
    }
    const { services } = contract;
    const { travel: tvl } = services;
    const { typeTraveling, airlineReservation, petPerCharge } = tvl;

    const hasRequiredAirlineReservationFields =
      airlineReservation.arrivalDate &&
      airlineReservation.code &&
      airlineReservation.departureAirport &&
      airlineReservation.departureDate &&
      airlineReservation.destinationAirport &&
      airlineReservation.flightNumber;

    if (hasRequiredAirlineReservationFields) {
      if (typeTraveling === 'charge') {
        const hasRequiredPetChargeFields =
          petPerCharge.receptor &&
          petPerCharge.phone &&
          petPerCharge.pickupDateTime &&
          petPerCharge.pickupLocation;

        contract.services.travel.status = hasRequiredPetChargeFields
          ? 'completed'
          : 'in-process';
      } else {
        contract.services.travel.status = 'completed';
      }
    }
    return contract;
  }
}
