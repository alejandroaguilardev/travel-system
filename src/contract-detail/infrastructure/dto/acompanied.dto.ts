import { Type } from 'class-transformer';
import {
  TravelAccompaniedPetInterface,
  TravelPetPerChargeInterface,
  TravelDestinationInterface,
} from '../../../contract-detail/domain/interfaces/travel.interface';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { TravelAccompaniedRequest } from '../../../contract-detail/application/update/accompanied-updater';

class TravelDestinationDto implements TravelDestinationInterface {
  @IsOptional()
  @IsString()
  countryDestination: string;
  @IsOptional()
  @IsString()
  cityDestination: string;
  @IsOptional()
  @IsString()
  directionDestination: string;
}

class TravelPetPerChargeDto implements TravelPetPerChargeInterface {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  document: string;
  @IsOptional()
  @IsString()
  documentNumber: string;
  @IsOptional()
  @IsString()
  phone: string;
  @IsOptional()
  @IsString()
  email: string;
}

class TravelAccompaniedPetDto implements TravelAccompaniedPetInterface {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  document: string;
  @IsOptional()
  @IsString()
  documentNumber: string;
  @IsOptional()
  @IsString()
  phone: string;
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  direction: string;
  @IsOptional()
  @IsString()
  district: string;
  @IsOptional()
  @IsString()
  province: string;
  @IsOptional()
  @IsString()
  department: string;
  @IsOptional()
  @IsString()
  image: string;
}

export class TravelAccompaniedDto implements TravelAccompaniedRequest {
  @Type(() => TravelDestinationDto)
  @ValidateNested()
  destination: TravelDestinationInterface;
  @Type(() => TravelPetPerChargeDto)
  @ValidateNested()
  petPerCharge: TravelPetPerChargeInterface;
  @Type(() => TravelAccompaniedPetDto)
  @ValidateNested()
  accompaniedPet: TravelAccompaniedPetInterface;
  @IsOptional()
  @IsString()
  observation: string;
}
