import { IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreatePetRequest } from '../../application/create/create-pet-request';
import { PetGenderType } from '../../domain/value-object/pet-gender';
import { CageChosenDto } from '../../../contract-detail/infrastructure/dto/cage.dto';
import { Type } from 'class-transformer';
import { CageChosenInterface } from '../../../contract-detail/domain/interfaces/cage.interface';

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

  @Type(() => CageChosenDto)
  @ValidateNested()
  cageRecommendation: CageChosenInterface;
}
