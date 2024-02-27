import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreatePetRequest } from '../../application/create/create-pet-request';
import { PetGenderType } from '../../domain/value-object/pet-gender';

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
}
