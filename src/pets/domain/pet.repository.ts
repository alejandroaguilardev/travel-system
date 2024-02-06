import { Repository } from '../../common/domain/repository';
import { Pet } from './pet';

export interface PetRepository extends Repository<Pet> {}
