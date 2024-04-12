import { IsString } from 'class-validator';

export class ContractCancelDto {
  @IsString()
  reasonForCancellation: string;
}
