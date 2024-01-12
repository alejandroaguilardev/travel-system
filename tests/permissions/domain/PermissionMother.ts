import { UuidMother } from '../../common/domain/uuid-mother';
import { StringMother } from '../../common/domain/string.mother';
import { CreatePermission } from '../../../src/permissions/application/create/create-permission';

export class PermissionMother {
  static create(data?: Partial<CreatePermission>) {
    return {
      id: data?.id ? data.id : UuidMother.create(),
      name: data?.name
        ? data.id
        : StringMother.create({ count: { min: 1, max: 1 } }),
      description: data?.name ? data.id : StringMother.create(),
    };
  }
}
