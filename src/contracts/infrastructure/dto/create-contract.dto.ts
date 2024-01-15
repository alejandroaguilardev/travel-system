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

class DocumentationDto {
  @IsBoolean()
  hasServiceIncluded: boolean;
}

class CageDto {
  @IsBoolean()
  hasServiceIncluded: boolean;
}

class TravelDto {
  @IsBoolean()
  hasServiceIncluded: boolean;
  @IsBoolean()
  travelingWithPet: boolean;
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
