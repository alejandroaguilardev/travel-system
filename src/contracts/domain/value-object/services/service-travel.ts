import { ContractStatus } from '../contract-status';
import { ContractHasServiceIncluded } from '../contract-has-service.included';
import { TravelAirlineReservation } from './travel/travel-airline-reservation';
import { TravelPetPerCharge } from './travel/travel-pet-per-charge';
import { TypeTraveling } from './travel/type-traveling';
import { TravelDefinition } from '../../interfaces/travel';
import { StatusDefinition } from '../../interfaces/status';

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
}
