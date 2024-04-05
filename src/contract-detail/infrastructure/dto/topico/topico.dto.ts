import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  ContractTopicoInterface,
  ChipContractInterface,
  ChipReviewContractInterface,
  RabiesReVaccinationContractInterface,
  RabiesVaccinationContractInterface,
  TakingSampleSerologicalTestContractInterface,
  VaccinationContractInterface,
} from '../../../domain/interfaces/topico.interface';

class ValuesDto {
  @IsBoolean()
  executed: boolean;
  @IsDate()
  date: Date;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  observation: string;
  @IsOptional()
  @IsString()
  user: string;
}

class ChipTopicoDto extends ValuesDto implements ChipContractInterface {
  @IsBoolean()
  hasIncluded: boolean;
}

class VaccinationTopicoDto
  extends ValuesDto
  implements VaccinationContractInterface
{
  @IsBoolean()
  hasIncluded: boolean;
}
class RabiesVaccinationContractDto
  extends ValuesDto
  implements RabiesVaccinationContractInterface
{
  @IsBoolean()
  hasIncluded: boolean;
}
class RabiesReVaccinationContractDto
  extends ValuesDto
  implements RabiesReVaccinationContractInterface {}

class ChipReviewDto extends ValuesDto implements ChipReviewContractInterface {}

class TakingSampleSerologicalTestContractDto
  extends ValuesDto
  implements TakingSampleSerologicalTestContractInterface
{
  @IsString()
  typeSample: string;
}

export class TopicoDto implements ContractTopicoInterface {
  @Type(() => ChipTopicoDto)
  @ValidateNested()
  chip: ChipContractInterface;

  @Type(() => VaccinationTopicoDto)
  @ValidateNested()
  vaccination: VaccinationTopicoDto;

  @Type(() => RabiesVaccinationContractDto)
  @ValidateNested()
  rabiesVaccination: RabiesVaccinationContractInterface;

  @Type(() => RabiesReVaccinationContractDto)
  @ValidateNested()
  rabiesReVaccination: RabiesReVaccinationContractInterface;

  @Type(() => ChipReviewDto)
  @ValidateNested()
  chipReview: ChipReviewContractInterface;

  @Type(() => TakingSampleSerologicalTestContractDto)
  @ValidateNested()
  takingSampleSerologicalTest: TakingSampleSerologicalTestContractInterface;
}
