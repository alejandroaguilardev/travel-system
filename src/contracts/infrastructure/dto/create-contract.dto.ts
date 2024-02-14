import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { ContractCreateRequest } from '../../application/create/contract-create-request';

export class CreateContractDto implements ContractCreateRequest {
  @IsUUID()
  id: string;
  @IsString()
  number: string;
  @IsUUID()
  client: string;
  @IsDate()
  startDate: Date;
  @IsOptional()
  @IsUUID()
  user: string;
}
