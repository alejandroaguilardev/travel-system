import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleCreator } from '../application/create/role-creator';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { RoleUpdater } from '../application/update/role-updater';
import { RoleSearch } from '../application/search/role-search';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { ResponseSearch } from '../../common/domain/response/response-search';
import { RoleSearchById } from '../application/search-by-id/role-search-by-id';
import { RoleRemover } from '../application/remove/role-remover';
import { MongoRoleRepository } from './persistence/mongo-role.repository';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { CommandRole } from '../application/create/command-role';
import { CommandCriteria } from '../../common/application/criteria/command-criteria';
import { RoleResponse } from '../domain/interfaces/role.response';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: MongoRoleRepository) {}

  create(
    createRoleDto: CreateRoleDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const roleCreator = new RoleCreator(this.roleRepository);
    const role = CommandRole.execute(createRoleDto);
    return roleCreator.execute(role, user);
  }

  findAll(
    criteriaDto: CriteriaDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<RoleResponse>> {
    const roleSearch = new RoleSearch(this.roleRepository);
    const criteria = CommandCriteria.fromData(criteriaDto);
    return roleSearch.execute(criteria, user);
  }

  findOne(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<RoleResponse> {
    const roleSearchById = new RoleSearchById(this.roleRepository);
    return roleSearchById.execute(id, user);
  }

  update(
    id: string,
    updateRoleDto: UpdateRoleDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const roleUpdater = new RoleUpdater(this.roleRepository);
    const role = CommandRole.execute(updateRoleDto);
    return roleUpdater.update(id, role, user);
  }

  remove(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const roleRemover = new RoleRemover(this.roleRepository);
    return roleRemover.execute(id, user);
  }
}
