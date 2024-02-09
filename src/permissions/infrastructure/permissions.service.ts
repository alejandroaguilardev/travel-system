import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionCreator } from '../application/create/permission-creator';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { PermissionResponse } from '../application/response/permission.response';
import { PermissionSearch } from '../application/search/permission-search';
import { ResponseSearch } from '../../common/domain/response/response-search';
import { PermissionSearchById } from '../application/search-by-id/permission-search-by-id';
import { PermissionUpdater } from '../application/updated/permission-updater';
import { PermissionRemover } from '../application/remove/permission-remover';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { MongoPermissionRepository } from './persistence/mongo-permission.repository';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { CommandPermissionCreate } from '../application/create/command-create-permission';
import { CommandCriteria } from '../../common/application/criteria/command-criteria';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly permissionRepository: MongoPermissionRepository,
  ) {}

  create(
    createPermissionDto: CreatePermissionDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const permissionCreator = new PermissionCreator(this.permissionRepository);
    const permission = CommandPermissionCreate.execute(createPermissionDto);

    return permissionCreator.execute(permission, user);
  }

  findAll(
    criteriaDto: CriteriaDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<PermissionResponse>> {
    const permissionFindAll = new PermissionSearch(this.permissionRepository);
    const criteria = CommandCriteria.fromData(criteriaDto);
    return permissionFindAll.execute(criteria, user);
  }

  findOne(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<PermissionResponse> {
    const permissionFindAll = new PermissionSearchById(
      this.permissionRepository,
    );
    return permissionFindAll.execute(id, user);
  }

  update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const permissionUpdater = new PermissionUpdater(this.permissionRepository);
    const permission = CommandPermissionCreate.execute(updatePermissionDto);
    return permissionUpdater.execute(id, permission, user);
  }

  remove(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const permissionRemover = new PermissionRemover(this.permissionRepository);
    return permissionRemover.execute(id, user);
  }
}
