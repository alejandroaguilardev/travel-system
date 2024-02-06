import { IsDate, IsString } from 'class-validator';
import { CreatePetRequest } from '../../application/create/create-pet-request';

export class CreatePetDto implements CreatePetRequest {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  race: string;
  @IsString()
  gender: string;
  @IsDate()
  birthDate: Date;
  @IsString()
  chip?: string;
  @IsString()
  color: string;
  @IsString()
  image: string;
}
