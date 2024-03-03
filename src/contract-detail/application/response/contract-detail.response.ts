import { ContractDetailInterface } from '../../domain/interfaces/contract-detail.interface';
import { PetInterface } from '../../../pets/domain/interfaces/pet.interface';

export interface ContractDetailResponse
  extends Omit<ContractDetailInterface, 'pet'> {
  pet: PetInterface;
}
