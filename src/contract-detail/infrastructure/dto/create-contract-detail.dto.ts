import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ContractDetailCreateRequest } from '../../application/create/contract-detail-create-request';
import { Type } from 'class-transformer';
import { DocumentationDto } from './documentation.dto';
import { CageDto } from './cage.dto';
import { TypeTravelingType } from '../../domain/interfaces/travel.interface';

class DestinationDto {
  @IsString()
  countryDestination: string;
}
class TravelDto {
  @IsBoolean()
  hasServiceIncluded: boolean;
  @IsBoolean()
  hasServiceAccompanied: boolean;
  @IsString()
  typeTraveling: TypeTravelingType;
  @Type(() => DestinationDto)
  @ValidateNested()
  destination: DestinationDto;
}

export class CreateContractDetailDto implements ContractDetailCreateRequest {
  @IsUUID()
  id: string;
  @IsOptional()
  @IsUUID()
  pet?: string;
  @Type(() => DocumentationDto)
  @ValidateNested()
  documentation: DocumentationDto;
  @Type(() => CageDto)
  @ValidateNested()
  cage: CageDto;
  @Type(() => TravelDto)
  @ValidateNested()
  travel: TravelDto;
  @IsOptional()
  @IsUUID()
  user: string;
}
