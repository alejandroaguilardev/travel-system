import { PetRepository } from '../../domain/pet.repository';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { PetResponse } from '../../domain/interfaces/pet.response';
import { ResponseSearch } from '../../../common/domain/response/response-search';

export class PetSearch {
  constructor(private readonly petRepository: PetRepository) {}

  execute(criteria: Criteria): Promise<ResponseSearch<PetResponse>> {
    return this.petRepository.search<PetResponse>(criteria);
  }
}
