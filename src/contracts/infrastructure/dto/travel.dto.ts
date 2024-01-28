import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StatusDefinition } from '../../domain/interfaces/status';
import { Type } from 'class-transformer';
import {
  TravelDefinition,
  TravelAirlineReservation,
  TravelPetPerCharge,
  TypeTraveling,
} from '../../domain/interfaces/travel';

class TravelAirlineReservationDto implements Partial<TravelAirlineReservation> {
  @IsString()
  code: string;
  @IsString()
  flightNumber: string;
  @IsString()
  departureAirport: string;
  @IsString()
  destinationAirport: string;
  @IsOptional()
  @IsDate()
  departureDate: Date | null = null;
  @IsOptional()
  @IsDate()
  arrivalDate: Date | null = null;
}

class TravelPetPerChargeDto implements Partial<TravelPetPerCharge> {
  @IsString()
  receptor: string;
  @IsString()
  email: string = '';
  @IsString()
  phone: string;
  @IsOptional()
  @IsDate()
  pickupDateTime: Date | null = null;
  @IsString()
  pickupLocation: string;
  @IsString()
  specialRequests: string;
}

export class TravelDto implements TravelDefinition {
  @IsString()
  status: StatusDefinition;
  @IsBoolean()
  hasServiceIncluded: boolean;
  @IsString()
  typeTraveling: TypeTraveling;
  @Type(() => TravelAirlineReservationDto)
  @ValidateNested()
  airlineReservation: TravelAirlineReservationDto;
  @Type(() => TravelPetPerChargeDto)
  @ValidateNested()
  petPerCharge: TravelPetPerChargeDto;
}
