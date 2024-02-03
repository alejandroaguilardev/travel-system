import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ContractCreateRequest } from '../../application/create/contract-create-request';
import { Type } from 'class-transformer';
import { DocumentationDto } from './documentation.dto';
import { CageDto } from './cage.dto';
import { TypeTravelingType } from '../../domain/interfaces/travel.interface';

class TravelDto {
  @IsBoolean()
  hasServiceIncluded: boolean;
  @IsBoolean()
  hasServiceAccompanied: boolean;
  @IsString()
  typeTraveling: TypeTravelingType;
}

export class CreateContractDto implements ContractCreateRequest {
  @IsUUID()
  id: string;
  @IsString()
  number: string;
  @IsUUID()
  client: string;
  @IsDate()
  startDate: Date;
  @IsArray()
  @IsUUID(undefined, { each: true })
  pets: string[] = [];
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
