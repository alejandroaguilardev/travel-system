import { TravelDepartureAirport } from './travel-departure-airport';
import { TravelCode } from './travel-code';
import { TravelFlightNumber } from './travel-flight-number';
import { TravelDestinationAirport } from './travel-destination-airport';
import { TravelDepartureDate } from './travel-departure-date';

export class TravelAirlineReservation {
  constructor(
    readonly code: TravelCode,
    readonly flightNumber: TravelFlightNumber,
    readonly departureAirport: TravelDepartureAirport,
    readonly destinationAirport: TravelDestinationAirport,
    readonly departureDate: TravelDepartureDate,
  ) {}

  toJson() {
    return {
      code: this.code.value,
      flightNumber: this.flightNumber.value,
      departureAirport: this.departureAirport.value,
      destinationAirport: this.destinationAirport.value,
      departureDate: this.departureDate.value,
    };
  }
}
