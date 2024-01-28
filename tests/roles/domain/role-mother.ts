import { UuidMother } from '../../common/domain/uuid-mother';
import { StringMother } from '../../common/domain/string.mother';
import { RoleCreatorRequest } from '../../../src/roles/application/create/role-creator-request';
import { RoleNameMother } from './role-name.mother';

export class RoleMother {
  static create(data?: Partial<RoleCreatorRequest>): RoleCreatorRequest {
    return {
      id: data?.id ?? UuidMother.create(),
      name: data?.name ?? RoleNameMother.create(),
      description:
        data?.description ??
        StringMother.create({ count: { min: 1, max: 15 } }),
      permissions: data?.permissions ?? [UuidMother.create()],
    };
  }
}
