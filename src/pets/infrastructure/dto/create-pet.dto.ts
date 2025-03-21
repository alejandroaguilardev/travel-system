import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePetRequest } from '../../application/create/create-pet-request';
import { PetGenderType } from '../../domain/value-object/pet-gender';
import { MeasurementsAndWeightDto } from './pet-measurements-and-weight';
import { MeasurementsAndWeightInterface } from '../../../pets/domain/interfaces/pet-measurements-and-weight';
import { CageChosenDto } from '../../../contract-detail/infrastructure/dto/cage.dto';
import { CageChosenInterface } from '../../../contract-detail/domain/interfaces/cage.interface';
import { ContractTopicoInterface } from '../../../contract-detail/domain/interfaces/topico.interface';

export class CreatePetDto implements CreatePetRequest {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  race: string;

  @IsString()
  gender: PetGenderType;

  @IsDate()
  birthDate: Date;

  @IsOptional()
  @IsString()
  chip: string;

  @IsOptional()
  @IsDate()
  chipDate: Date | null;

  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsString()
  country: string;

  @IsString()
  type: string;

  @IsString()
  sterilized: string;

  @IsString()
  adopter: string;

  @IsBoolean()
  isBrachycephalic: boolean;

  @IsBoolean()
  isPotentiallyDangerous: boolean;

  @IsOptional()
  topico?: ContractTopicoInterface;

  @IsOptional()
  @Type(() => MeasurementsAndWeightDto)
  @ValidateNested()
  measurementsAndWeight: MeasurementsAndWeightInterface;

  @IsOptional()
  @Type(() => CageChosenDto)
  @ValidateNested()
  cageRecommendation: CageChosenInterface;

  @IsOptional()
  @IsBoolean()
  isPuppy?: boolean;
}
