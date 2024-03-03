import { Type } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ContractCreateRequest } from '../../application/create/contract-create-request';
import { CreateContractDetailDto } from '../../../contract-detail/infrastructure/dto/create-contract-detail.dto';
import { ContractDetailCreateRequest } from '../../../contract-detail/application/create';

export class CreateContractDto implements ContractCreateRequest {
  @IsUUID()
  id: string;
  @IsString()
  number: string;
  @IsUUID()
  client: string;
  @IsDate()
  startDate: Date;
  @Type(() => CreateContractDetailDto)
  @ValidateNested({ each: true })
  details: ContractDetailCreateRequest[];
  @IsUUID()
  adviser: string;
  @IsOptional()
  @IsUUID()
  user: string;
}
