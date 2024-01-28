import { StatusDefinition } from './status';

export type TypeTraveling = 'accompanied' | 'charge' | 'none';

export interface TravelAirlineReservation {
  code: string;
  flightNumber: string;
  departureAirport: string;
  destinationAirport: string;
  departureDate: Date | null;
  arrivalDate: Date | null;
}

export interface TravelPetPerCharge {
  receptor: string;
  email: string;
  phone: string;
  pickupDateTime: Date | null;
  pickupLocation: string;
  specialRequests: string;
}

export interface TravelDefinition {
  status: StatusDefinition;
  hasServiceIncluded: boolean;
  typeTraveling: TypeTraveling;
  airlineReservation: TravelAirlineReservation;
  petPerCharge: TravelPetPerCharge;
}

export interface PartialTravelDefinition
  extends Omit<
    Partial<TravelDefinition>,
    'airlineReservation' | 'petPerCharge'
  > {
  airlineReservation: Partial<TravelAirlineReservation>;
  petPerCharge: Partial<TravelPetPerCharge>;
}
