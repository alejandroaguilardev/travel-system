import { StatusInterface } from './status.interface';

export type TypeTravelingType = 'accompanied' | 'charge' | 'none';

export interface TravelAccompaniedPetInterface {
  name: string;
  document: string;
  documentNumber: string;
  phone: string;
  email: string;
  department: string;
  province: string;
  district: string;
  direction: string;
}

export interface TravelAirlineReservationInterface {
  code: string;
  flightNumber: string;
  departureAirport: string;
  destinationAirport: string;
  departureDate: Date | null;
  arrivalDate: Date | null;
}

export interface TravelDestinationInterface {
  countryDestination: string;
  cityDestination: string;
  directionDestination: string;
}

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
  name: string;
  document: string;
  documentNumber: string;
  phone: string;
  email: string;
}

export interface TravelInterface {
  status: StatusInterface;
  hasServiceIncluded: boolean;
  hasServiceAccompanied: boolean;
  typeTraveling: TypeTravelingType;
  airlineReservation: TravelAirlineReservationInterface;
  petPerCharge: TravelPetPerChargeInterface;
  accompaniedPet: TravelAccompaniedPetInterface;
  destination: TravelDestinationInterface;
}

export interface PartialTravelInterface
  extends Omit<
    Partial<TravelInterface>,
    'airlineReservation' | 'petPerCharge'
  > {
  airlineReservation: Partial<TravelAirlineReservationInterface>;
  petPerCharge: Partial<TravelPetPerChargeInterface>;
}
