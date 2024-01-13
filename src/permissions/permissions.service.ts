import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './infrastructure/dto/create-permission.dto';
import { UpdatePermissionDto } from './infrastructure/dto/update-permission.dto';
import { PermissionCreator } from './application/create/permission-creator';
import { CriteriaDto } from '../common/infrastructure/dto/criteria.dto';
import { PermissionResponse } from './application/response/permission.response';
import { PermissionFindAll } from './application/find-all/permission-find-all';
import { ResponseSearch } from '../common/domain/response/response-search';
import { PermissionFind } from './application/find/permission-find';
import { PermissionUpdater } from './application/updated/permission-updater';
import { PermissionRemover } from './application/remove/permission-remover';
import { ResponseSuccess } from '../common/domain/response/response-success';
import { MongoPermissionRepository } from './infrastructure/persistence/mongo-permission.repository';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly permissionRepository: MongoPermissionRepository,
  ) {}

  create(createPermissionDto: CreatePermissionDto): Promise<ResponseSuccess> {
    const permissionCreator = new PermissionCreator(this.permissionRepository);
    return permissionCreator.create(createPermissionDto);
  }

  findAll(
    criteriaDto: CriteriaDto,
  ): Promise<ResponseSearch<PermissionResponse>> {
    const permissionFindAll = new PermissionFindAll(this.permissionRepository);
    return permissionFindAll.find(criteriaDto);
  }

  findOne(id: string): Promise<PermissionResponse> {
    const permissionFindAll = new PermissionFind(this.permissionRepository);
    return permissionFindAll.find(id);
  }

  update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<ResponseSuccess> {
    const permissionUpdater = new PermissionUpdater(this.permissionRepository);
    return permissionUpdater.update(id, updatePermissionDto);
  }

  remove(id: string): Promise<ResponseSuccess> {
    const permissionRemover = new PermissionRemover(this.permissionRepository);
    return permissionRemover.remove(id);
  }
}
