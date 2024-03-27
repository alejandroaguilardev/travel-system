import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CageChosenDto } from '../../../contract-detail/infrastructure/dto/cage.dto';
import { Type } from 'class-transformer';
import { CageChosenInterface } from '../../../contract-detail/domain/interfaces/cage.interface';
import { MeasurementsAndWeightInterface } from '../../../pets/domain/interfaces/pet-measurements-and-weight';
import { PetMeasurementsAndWeightUpdaterRequest } from '../../../pets/application/update/pet-measurements-and-weight-updater';
import { PetGenderType } from '../../../pets/domain/value-object/pet-gender';

class MeasurementsAndWeightDto implements MeasurementsAndWeightInterface {
  @IsNumber()
  weight: number;
  @IsNumber()
  height: number;
  @IsNumber()
  width: number;
  @IsNumber()
  length: number;
}

export class PetMeasurementsAndWeightUpdaterDto
  implements PetMeasurementsAndWeightUpdaterRequest
{
  @IsString()
  race: string;

  @IsString()
  gender: PetGenderType;

  @IsString()
  color: string;

  @IsString()
  type: string;

  @IsString()
  sterilized: string;

  @Type(() => MeasurementsAndWeightDto)
  @ValidateNested()
  measurementsAndWeight: MeasurementsAndWeightInterface;

  @Type(() => CageChosenDto)
  @ValidateNested()
  cageRecommendation: CageChosenInterface;
}
