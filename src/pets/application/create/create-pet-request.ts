import { PetInterface } from '../../domain/interfaces/pet.interface';

export interface CreatePetRequest
  extends Omit<PetInterface, 'status' | 'user'> {}
