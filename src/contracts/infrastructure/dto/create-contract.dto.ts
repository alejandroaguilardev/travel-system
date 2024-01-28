import {
  IsArray,
  IsBoolean,
  IsDate,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ContractCreateRequest } from '../../application/create/contract-create-request';
import { Type } from 'class-transformer';
import { DocumentationDto } from './documentation.dto';
import { CageDto } from './cage.dto';
import { TypeTraveling } from '../../domain/interfaces/travel';

class TravelDto {
  @IsBoolean()
  hasServiceIncluded: boolean;
  @IsString()
  typeTraveling: TypeTraveling;
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
}
