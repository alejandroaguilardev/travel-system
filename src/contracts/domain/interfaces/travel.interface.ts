import { TravelAirlineReservation } from '../value-object/services/travel';
import { StatusInterface } from './status.interface';

export type TypeTravelingType = 'accompanied' | 'charge' | 'none';

export interface TravelAirlineReservationInterface {
  code: string;
  flightNumber: string;
  departureAirport: string;
  destinationAirport: string;
  departureDate: Date | null;
  arrivalDate: Date | null;
  user?: string;
}

export interface TravelPetPerChargeInterface {
  receptor: string;
  email: string;
  phone: string;
  pickupDateTime: Date | null;
  pickupLocation: string;
  specialRequests: string;
  user?: string;
}

export interface TravelInterface {
  status: StatusInterface;
  hasServiceIncluded: boolean;
  hasServiceAccompanied: boolean;
  typeTraveling: TypeTravelingType;
  airlineReservation: TravelAirlineReservationInterface;
  petPerCharge: TravelPetPerChargeInterface;
}

export interface PartialTravelInterface
  extends Omit<
    Partial<TravelInterface>,
    'airlineReservation' | 'petPerCharge'
  > {
  airlineReservation: Partial<TravelAirlineReservation>;
  petPerCharge: Partial<TravelPetPerChargeInterface>;
}
