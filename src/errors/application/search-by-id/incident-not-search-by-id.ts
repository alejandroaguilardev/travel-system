import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { IncidentRequest } from '../response/incident-response';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { HttpInterface } from '../../../common/application/services/http-service';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class IncidentNotificationSearchById {
  constructor(private readonly http: HttpInterface) {}

  execute(
    id: Uuid,
    user: UserWithoutWithRoleResponse,
  ): Promise<IncidentRequest> {
    PermissionValidator.execute(user, AuthGroup.INCIDENTS, AuthPermission.READ);
    return this.http.get(`log?${id.value}`);
  }
}
