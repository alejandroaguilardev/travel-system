import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatusInterface } from '../../domain/interfaces/status.interface';
import { TravelAccompaniedDto } from './acompanied.dto';
import {
  TypeTravelingType,
  TravelAirlineReservationInterface,
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
  @IsString()
  itinerary: string;
  @IsOptional()
  @IsDate()
  departureDate: Date | null = null;
  @IsOptional()
  @IsDate()
  arrivalDate: Date | null = null;
  @IsOptional()
  @IsString()
  archive?: string;
  @IsOptional()
  @IsString()
  user?: string;
}

export class TravelDto extends TravelAccompaniedDto implements TravelInterface {
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
  @IsOptional()
  @IsString()
  guideNumber: string;
  @IsOptional()
  @IsString()
  observation: string;
}
