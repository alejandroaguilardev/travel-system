import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateCageRequest } from '../../application/create/create-cage-request';

export class CreateCageDto implements CreateCageRequest {
  @IsUUID()
  id: string;
  @IsString()
  typeCage: string;
  @IsString()
  modelCage: string;
  @IsString()
  dimensionsCage: string;
  @IsOptional()
  user?: string;
}
