import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { ContractDetailCreateRequest } from '../../application/create/contract-detail-create-request';
import { Type } from 'class-transformer';
import { DocumentationDto } from './documentation.dto';
import { CageDto } from './cage.dto';
import { ContractTopicoInterface } from 'src/contract-detail/domain/interfaces/topico.interface';
import { TravelDto } from './travel.dto';

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
  guideNumber: string;
  @IsOptional()
  topico?: ContractTopicoInterface;
}
