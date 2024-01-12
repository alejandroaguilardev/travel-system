import { ResponseSearch } from '../../../common/domain/response/response-search';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';
import { CriteriaFactory } from '../../../common/application/criteria/criteria.factory';
import { RoleRepository } from '../../domain/role.repository';
import { RoleResponse } from '../response/role.response';

export class RoleSearch {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(
    criteriaRequest: CriteriaRequest,
  ): Promise<ResponseSearch<RoleResponse>> {
    const criteria = CriteriaFactory.fromData(criteriaRequest);
    return this.roleRepository.search<RoleResponse>(criteria);
  }
}
