import { MongoIncidentRepository } from '../../infrastructure/persistence/mongo-incident.repository';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { IncidentRequest } from '../response/incident-response';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class IncidentSearchById {
  constructor(private readonly repository: MongoIncidentRepository) {}

  execute(
    id: Uuid,
    user: UserWithoutWithRoleResponse,
  ): Promise<IncidentRequest> {
    PermissionValidator.execute(user, AuthGroup.INCIDENTS, AuthPermission.READ);
    return this.repository.searchById(id);
  }
}
