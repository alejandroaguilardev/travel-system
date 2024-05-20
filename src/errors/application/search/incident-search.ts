import { MongoIncidentRepository } from '../../infrastructure/persistence/mongo-incident.repository';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import { IncidentRequest } from '../response/incident-response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class IncidentSearch {
  constructor(private readonly repository: MongoIncidentRepository) {}

  execute(
    criteria: Criteria,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<IncidentRequest>> {
    PermissionValidator.execute(user, AuthGroup.INCIDENTS, AuthPermission.LIST);

    return this.repository.search(criteria);
  }
}
