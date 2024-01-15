import { StatusDefinition } from './status';

export interface TravelDefinition {
  status: StatusDefinition;
  hasServiceIncluded: boolean;
  travelingWithPet: boolean;
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
