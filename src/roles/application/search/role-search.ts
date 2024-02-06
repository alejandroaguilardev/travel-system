import { ResponseSearch } from '../../../common/domain/response/response-search';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';
import { RoleRepository } from '../../domain/role.repository';
import { RoleResponse } from '../response/role.response';

export class RoleSearch {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(
    criteriaRequest: CriteriaRequest,
  ): Promise<ResponseSearch<RoleResponse>> {
    const criteria = CommandCriteria.fromData(criteriaRequest);
    return this.roleRepository.search<RoleResponse>(criteria);
  }
}
