import { PermissionRepository } from '../../domain/permission.repository';
import { PermissionResponse } from '../response/permission.response';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';
import { ResponseSearch } from '../../../common/domain/response/response-search';

export class PermissionFindAll {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async find(
    criteriaRequest: CriteriaRequest,
  ): Promise<ResponseSearch<PermissionResponse>> {
    const criteria = CommandCriteria.fromData(criteriaRequest);
    return this.permissionRepository.search<PermissionResponse>(criteria);
  }
}
