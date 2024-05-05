import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ContractCreateRequest } from '../../application/create/contract-create-request';
import { CreateContractDetailDto } from '../../../contract-detail/infrastructure/dto/create-contract-detail.dto';
import { ContractDetailCreateRequest } from '../../../contract-detail/application/create';
import { PayInInstallmentInterface } from '../../../contracts/domain/interfaces/pay-in-installment.interface';
import { PayInInstallmentDto } from './pay-installment.dto';

export class CreateContractDto implements ContractCreateRequest {
  @IsUUID()
  id: string;
  @IsOptional()
  @IsString()
  folder: string;
  @IsOptional()
  @IsString()
  number: string;
  @IsString()
  format: string;
  @IsUUID()
  client: string;
  @IsDate()
  startDate: Date;
  @IsDate()
  estimatedDate: Date;
  @Type(() => CreateContractDetailDto)
  @ValidateNested({ each: true })
  details: ContractDetailCreateRequest[];
  @IsUUID()
  adviser: string;
  @IsNumber()
  price: number;

  @Type(() => PayInInstallmentDto)
  @ValidateNested({ each: true })
  payInInstallments?: PayInInstallmentInterface[];

  @IsOptional()
  @IsBoolean()
  finishClient?: boolean;

  @IsOptional()
  @IsString()
  reasonForCancellation?: string;

  @IsOptional()
  @IsUUID()
  user: string;
}
