import { ContractDetailInterface } from '../../domain/interfaces/contract-detail.interface';
import { Pet } from '../../../pets/domain/pet';

export interface ContractDetailResponse
  extends Omit<ContractDetailInterface, 'pet'> {
  pet: Pet;
}
