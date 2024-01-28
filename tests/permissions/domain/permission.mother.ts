import { UuidMother } from '../../common/domain/uuid-mother';
import { StringMother } from '../../common/domain/string.mother';
import { CreatePermission } from '../../../src/permissions/application/create/create-permission';
import { FirstNameMother } from '../../users/domain/first-name-mother';
import { PermissionNameMother } from './permission-name.mother';

export class PermissionMother {
  static create(data?: Partial<CreatePermission>) {
    return {
      id: data?.id ? data.id : UuidMother.create(),
      name: data?.name ? data.id : PermissionNameMother.create(),
      description: data?.name ? data.id : StringMother.create(),
      group: data?.group ? data.group : FirstNameMother.create(),
    };
  }
}
