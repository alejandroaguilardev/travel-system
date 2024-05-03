import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { ContractDetailCreateRequest } from '../../application/create/contract-detail-create-request';
import { Type } from 'class-transformer';
import { DocumentationDto } from './documentation.dto';
import { CageDto } from './cage.dto';
import { TravelDto } from './travel.dto';
import { ContractTopicoInterface } from '../../../contract-detail/domain/interfaces/topico.interface';

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
  @IsOptional()
  topico?: ContractTopicoInterface;
}
