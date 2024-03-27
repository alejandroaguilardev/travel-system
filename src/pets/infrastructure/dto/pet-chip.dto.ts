import { IsDate, IsString } from 'class-validator';

export class PetChipDto {
  @IsString()
  chip: string;

  @IsDate()
  chipDate: Date;
}
