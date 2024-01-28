import { StatusDefinition } from './status';

export type TypeTraveling = 'accompanied' | 'charge' | 'none';

export interface TravelDefinition {
  status: StatusDefinition;
  hasServiceIncluded: boolean;
  typeTraveling: TypeTraveling;
  airlineReservation: {
    code: string;
    flightNumber: string;
    departureAirport: string;
    destinationAirport: string;
    departureDate: Date;
  };
  petPerCharge: {
    receptor: string;
    email: string;
    phone: string;
    pickupDateTime: Date;
    pickupLocation: string;
    specialRequests: string;
  };
}
