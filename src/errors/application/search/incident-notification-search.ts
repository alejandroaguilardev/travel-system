import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import { IncidentRequest } from '../response/incident-response';
import { HttpInterface } from '../../../common/application/services/http-service';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { Criteria } from '../../../common/domain/criteria/criteria';

export class IncidentNotificationSearch {
  constructor(private readonly http: HttpInterface) {}

  async execute(
    criteria: Criteria,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<IncidentRequest>> {
    PermissionValidator.execute(user, AuthGroup.INCIDENTS, AuthPermission.LIST);

    const queryString = this.queryString(criteria);
    console.log(queryString);
    const { data } = await this.http.get(`log?${queryString}`);
    console.log({ data });
    return data;
  }

  private queryString(criteria: Criteria): string {
    const searchParams = new URLSearchParams();

    criteria.filters.forEach((_) => {
      if (_.field.value === 'name')
        searchParams.set('name', `${_.value.getValue()}`);
      if (_.field.value === 'error')
        searchParams.set('error', `${_.value.getValue()}`);
    });

    if (criteria.size.value)
      searchParams.set('limit', `${criteria.size.value}`);
    if (criteria.start.value)
      searchParams.set('offset', `${criteria.start.value}`);
    return `?${searchParams.toString()}`;
  }
}
