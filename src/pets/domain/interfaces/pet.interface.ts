import { Status } from '../../../common/domain/value-object/status-value-object';
import { PetGenderType } from '../value-object/pet-gender';
import { CageChosenInterface } from '../../../contract-detail/domain/interfaces/cage.interface';
import { MeasurementsAndWeightInterface } from './pet-measurements-and-weight';
import { ContractTopicoInterface } from '../../../contract-detail/domain/interfaces/topico.interface';

export interface PetInterface {
  id: string;
  name: string;
  race: string;
  gender: PetGenderType;
  birthDate: Date;
  chip: string;
  chipDate: Date | null;
  color: string;
  image?: string;
  country: string;
  type: string;
  sterilized: string;
  status: Status;
  adopter: string;
  cageRecommendation?: CageChosenInterface;
  measurementsAndWeight?: MeasurementsAndWeightInterface;
  isBrachycephalic: boolean;
  isPotentiallyDangerous: boolean;
  topico?: ContractTopicoInterface;
  user?: string;
  isPuppy?: boolean;
}
