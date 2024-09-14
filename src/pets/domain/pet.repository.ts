import { ContractTopico } from '../../contract-detail/domain/value-object/contract-topico';
import { Repository } from '../../common/domain/repository';
import { PetResponse, PetsClientResponse } from './interfaces/pet.response';
import { Pet } from './pet';
import { PetChip } from './value-object/pet-chip';
import { Uuid } from '../../common/domain/value-object';

export interface PetRepository extends Repository<Pet> {
  searchByChip: (chip: PetChip) => Promise<PetResponse>;
  updateTopico: (petId: Uuid, topico: ContractTopico) => Promise<void>;
  searchByClient: (idClient: Uuid) => Promise<PetsClientResponse[]>;
}
