import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleCreator } from '../application/create/role-creator';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { RoleUpdater } from '../application/update/role-updater';
import { RoleSearch } from '../application/search/role-search';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { ResponseSearch } from '../../common/domain/response/response-search';
import { RoleResponse } from '../application/response/role.response';
import { RoleSearchById } from '../application/search-by-id/role-search-by-id';
import { RoleRemover } from '../application/remove/role-remover';
import { MongoRoleRepository } from './persistence/mongo-role.repository';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: MongoRoleRepository) {}

  create(createRoleDto: CreateRoleDto): Promise<ResponseSuccess> {
    const roleCreator = new RoleCreator(this.roleRepository);
    return roleCreator.create(createRoleDto);
  }

  findAll(criteriaDto: CriteriaDto): Promise<ResponseSearch<RoleResponse>> {
    const roleSearch = new RoleSearch(this.roleRepository);
    return roleSearch.execute(criteriaDto);
  }

  findOne(id: string): Promise<RoleResponse> {
    const roleSearchById = new RoleSearchById(this.roleRepository);
    return roleSearchById.execute(id);
  }

  update(id: string, updateRoleDto: UpdateRoleDto): Promise<ResponseSuccess> {
    const roleUpdater = new RoleUpdater(this.roleRepository);
    return roleUpdater.update(id, updateRoleDto);
  }

  remove(id: string): Promise<ResponseSuccess> {
    const roleRemover = new RoleRemover(this.roleRepository);
    return roleRemover.execute(id);
  }
}
