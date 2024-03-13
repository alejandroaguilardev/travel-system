import { Repository } from '../../common/domain/repository';
import { PetResponse } from './interfaces/pet.response';
import { Pet } from './pet';
import { PetChip } from './value-object/pet-chip';

export interface PetRepository extends Repository<Pet> {
  searchByChip: (chip: PetChip) => Promise<PetResponse>;
}
