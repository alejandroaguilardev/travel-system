import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatusInterface } from '../../domain/interfaces/status.interface';
import {
  CageInterface,
  CageChosenInterface,
} from '../../domain/interfaces/cage.interface';

class CageChosenDto implements Partial<CageChosenInterface> {
  @IsString()
  modelCage?: string;
  @IsString()
  dimensionsCage?: string;
  @IsString()
  typeCage?: string;
  @IsOptional()
  @IsString()
  user?: string;
}

export class CageDto implements CageInterface {
  @IsString()
  status: StatusInterface;
  @IsBoolean()
  hasServiceIncluded: boolean;
  @IsBoolean()
  swornDeclaration: boolean;
  @Type(() => CageChosenDto)
  @ValidateNested()
  chosen: CageChosenInterface;
  @IsString()
  recommendation: string;
}
