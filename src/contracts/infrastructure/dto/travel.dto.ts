import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatusInterface } from '../../domain/interfaces/status.interface';
import {
  TypeTravelingType,
  TravelAirlineReservationInterface,
  TravelPetPerChargeInterface,
  TravelInterface,
} from '../../domain/interfaces/travel.interface';

class TravelAirlineReservationDto
  implements Partial<TravelAirlineReservationInterface>
{
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
  @IsOptional()
  @IsString()
  user?: string;
}

class TravelPetPerChargeDto implements Partial<TravelPetPerChargeInterface> {
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
  @IsOptional()
  @IsString()
  user?: string;
}

export class TravelDto implements TravelInterface {
  @IsString()
  status: StatusInterface;
  @IsBoolean()
  hasServiceIncluded: boolean;
  @IsBoolean()
  hasServiceAccompanied: boolean;
  @IsString()
  typeTraveling: TypeTravelingType;
  @Type(() => TravelAirlineReservationDto)
  @ValidateNested()
  airlineReservation: TravelAirlineReservationDto;
  @Type(() => TravelPetPerChargeDto)
  @ValidateNested()
  petPerCharge: TravelPetPerChargeDto;
}
