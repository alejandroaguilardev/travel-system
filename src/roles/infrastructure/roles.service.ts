import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleCreator } from '../application/create/role-creator';
import { MongoRoleRepository } from './persistence/mongo-role.repository';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { RoleUpdater } from '../application/update/role-updater';
import { RoleSearch } from '../application/search/role-search';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { ResponseSearch } from '../../common/domain/response/response-search';
import { RoleResponse } from '../application/response/role.response';
import { RoleSearchById } from '../application/search-by-id/role-search-by-id';
import { RoleRemover } from '../application/remove/role-remover';

@Injectable()
export class RolesService {
  constructor(private readonly mongoRoleRepository: MongoRoleRepository) {}

  create(createRoleDto: CreateRoleDto): Promise<ResponseSuccess> {
    const roleCreator = new RoleCreator(this.mongoRoleRepository);
    return roleCreator.create(createRoleDto);
  }

  findAll(criteriaDto: CriteriaDto): Promise<ResponseSearch<RoleResponse>> {
    const roleSearch = new RoleSearch(this.mongoRoleRepository);
    return roleSearch.execute(criteriaDto);
  }

  findOne(id: string): Promise<RoleResponse> {
    const roleSearchById = new RoleSearchById(this.mongoRoleRepository);
    return roleSearchById.execute(id);
  }

  update(id: string, updateRoleDto: UpdateRoleDto): Promise<ResponseSuccess> {
    const roleUpdater = new RoleUpdater(this.mongoRoleRepository);
    return roleUpdater.update(id, updateRoleDto);
  }

  remove(id: string): Promise<ResponseSuccess> {
    const roleRemover = new RoleRemover(this.mongoRoleRepository);
    return roleRemover.execute(id);
  }
}
