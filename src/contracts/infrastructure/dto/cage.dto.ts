import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { StatusDefinition } from '../../domain/interfaces/status';
import { Type } from 'class-transformer';
import { CageDefinition, CageChosen } from '../../domain/interfaces/cage';

class CageChosenDto implements Partial<CageChosen> {
  @IsString()
  modelCage?: string;
  @IsString()
  dimensionsCage?: string;
  @IsString()
  typeCage?: string;
}

export class CageDto implements CageDefinition {
  @IsString()
  status: StatusDefinition;
  @IsBoolean()
  hasServiceIncluded: boolean;
  @IsBoolean()
  swornDeclaration: boolean;
  @Type(() => CageChosenDto)
  @ValidateNested()
  chosen: CageChosen;
  @IsString()
  recommendation: string;
}
