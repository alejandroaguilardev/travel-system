import { Status } from '../../../common/domain/value-object/status-value-object';
import { PetGenderType } from '../value-object/pet-gender';
import { CageChosenInterface } from '../../../contract-detail/domain/interfaces/cage.interface';
import { MeasurementsAndWeightInterface } from './pet-measurements-and-weight';

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
  user?: string;
}
