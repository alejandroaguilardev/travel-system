import { Repository } from '../../common/domain/repository';
import { Role } from './role';
import { Uuid } from '../../common/domain/value-object/uuid';
import { RoleResponse } from './interfaces/role.response';

export interface RoleRepository extends Repository<Role> {
  searchByIdResponse: (roleId: Uuid) => Promise<RoleResponse>;
}
