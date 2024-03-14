import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { MongoFolderRepository } from './persistence/mongo-folder.repository';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { FolderCreator } from '../application/create/folder-creator';
import { ResponseSearch } from '../../common/domain/response/response-search';
import { CommandCreatorFolder } from '../application/create/command-folder-creator';
import { FolderResponse } from '../domain/interfaces/folder.response';
import { FolderSearch } from '../application/search/folder-search';
import { CommandCriteria } from '../../common/application/criteria/command-criteria';
import { FolderSearchById } from '../application/search-by-id/folder-search-by-id';
import { FolderUpdater } from '../application/update/folder-updater';
import { FolderRemover } from '../application/remove/folder-remover';

@Injectable()
export class FoldersService {
  constructor(private readonly mongoFolderRepository: MongoFolderRepository) {}

  create(
    createFolderDto: CreateFolderDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const folderCreator = new FolderCreator(this.mongoFolderRepository);
    const folder = CommandCreatorFolder.execute(createFolderDto, user.id);
    return folderCreator.create(folder, user);
  }

  findAll(
    criteriaDto: CriteriaDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<FolderResponse>> {
    const folderSearch = new FolderSearch(this.mongoFolderRepository);
    const criteria = CommandCriteria.fromData(criteriaDto);
    return folderSearch.execute(criteria, user);
  }

  findOne(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<FolderResponse> {
    const folderSearchById = new FolderSearchById(this.mongoFolderRepository);
    return folderSearchById.execute(id, user);
  }

  update(
    id: string,
    updateFolderDto: UpdateFolderDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const folderUpdater = new FolderUpdater(this.mongoFolderRepository);
    const folder = CommandCreatorFolder.execute(updateFolderDto, user.id);
    return folderUpdater.execute(id, folder, user);
  }

  remove(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const folderRemover = new FolderRemover(this.mongoFolderRepository);
    return folderRemover.execute(id, user);
  }
}
