import { IsOptional, ValidateNested } from 'class-validator';
import { CreatePetDto } from './create-pet.dto';
import { Type } from 'class-transformer';
import { MeasurementsAndWeightDto } from './pet-measurements-and-weight';
import { MeasurementsAndWeightInterface } from '../../../pets/domain/interfaces/pet-measurements-and-weight';
import { CageChosenInterface } from '../../../contract-detail/domain/interfaces/cage.interface';
import { CageChosenDto } from '../../../contract-detail/infrastructure/dto/cage.dto';

export class UpdatePetDto extends CreatePetDto {
  @IsOptional()
  @Type(() => MeasurementsAndWeightDto)
  @ValidateNested()
  measurementsAndWeight: MeasurementsAndWeightInterface;

  @IsOptional()
  @Type(() => CageChosenDto)
  @ValidateNested()
  cageRecommendation: CageChosenInterface;
}
