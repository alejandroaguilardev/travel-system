import { UuidOptional } from '../../../../../common/domain/value-object';
import { TravelDepartureAirport } from './travel-departure-airport';
import { TravelCode } from './travel-code';
import { TravelFlightNumber } from './travel-flight-number';
import { TravelDestinationAirport } from './travel-destination-airport';
import { TravelDepartureDate } from './travel-departure-date';
import { TravelArrivalDate } from './travel-arrival-date';

export class TravelAirlineReservation {
  constructor(
    readonly code: TravelCode,
    readonly flightNumber: TravelFlightNumber,
    readonly departureAirport: TravelDepartureAirport,
    readonly destinationAirport: TravelDestinationAirport,
    readonly departureDate: TravelDepartureDate,
    readonly arrivalDate: TravelArrivalDate,
    readonly user: UuidOptional,
  ) {}

  toJson() {
    return {
      code: this.code.value,
      flightNumber: this.flightNumber.value,
      departureAirport: this.departureAirport.value,
      destinationAirport: this.destinationAirport.value,
      departureDate: this.departureDate.value,
      arrivalDate: this.arrivalDate.value,
      user: this.user.value,
    };
  }
}
