import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MeasurementsAndWeightInterface } from '../../../pets/domain/interfaces/pet-measurements-and-weight';

export class MeasurementsAndWeightDto
  implements MeasurementsAndWeightInterface
{
  @IsNumber()
  weight: number;
  @IsNumber()
  height: number;
  @IsNumber()
  width: number;
  @IsNumber()
  length: number;
}

export class PetMeasurementsAndWeightUpdaterDto {
  @Type(() => MeasurementsAndWeightDto)
  @ValidateNested()
  measurementsAndWeight: MeasurementsAndWeightInterface;
}
