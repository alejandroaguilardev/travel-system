import { CageRepository } from '../../domain/cage.repository';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { CageResponse } from '../../domain/interfaces/cage.response';
import { ResponseSearch } from '../../../common/domain/response/response-search';

export class CageSearch {
  constructor(private readonly cageRepository: CageRepository) {}

  execute(criteria: Criteria): Promise<ResponseSearch<CageResponse>> {
    return this.cageRepository.search<CageResponse>(criteria);
  }
}
