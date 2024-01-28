import { Repository } from '../../common/domain/repository';
import { RoleResponse } from '../application/response/role.response';
import { Role } from './role';
import { Uuid } from '../../common/domain/value-object/uuid';

export interface RoleRepository extends Repository<Role> {
  searchByIdResponse: (roleId: Uuid) => Promise<RoleResponse>;
}
