import { Injectable } from '@nestjs/common';
import { UserWithoutWithRoleResponse } from '../../users/application/response/user-without.response';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { CreateCageDto } from './dto/create-cage.dto';
import { UpdateCageDto } from './dto/update-cage.dto';
import { MongoCageRepository } from './persistence/mongo-cage.repository';
import { CageCreator } from '../application/create/cage-creator';
import { CommandCageCreator } from '../application/create/command-cage-creator';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { CageSearch } from '../application/search/cage-search';
import { CageSearchById } from '../application/search-by-id/cage-search-by-id';
import { CageResponse } from '../domain/interfaces/cage.response';
import { ResponseSearch } from '../../common/domain/response/response-search';
import { CommandCriteria } from '../../common/application/criteria/command-criteria';
import { CageUpdater } from '../application/update/cage-updater';
import { CageRemover } from '../application/remove/cage-remover';

@Injectable()
export class CagesService {
  constructor(private readonly mongoCageRepository: MongoCageRepository) {}

  create(
    createCageDto: CreateCageDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const cageCreator = new CageCreator(this.mongoCageRepository);
    const cage = CommandCageCreator.execute(createCageDto, user.id);
    return cageCreator.create(cage, user);
  }

  findAll(criteriaDto: CriteriaDto): Promise<ResponseSearch<CageResponse>> {
    const cageSearch = new CageSearch(this.mongoCageRepository);
    const criteria = CommandCriteria.fromData(criteriaDto);
    return cageSearch.execute(criteria);
  }

  findOne(id: string): Promise<CageResponse> {
    const cageSearchById = new CageSearchById(this.mongoCageRepository);
    return cageSearchById.execute(id);
  }

  update(
    id: string,
    updateCageDto: UpdateCageDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const cageUpdater = new CageUpdater(this.mongoCageRepository);
    const cage = CommandCageCreator.execute(updateCageDto, user.id);
    return cageUpdater.execute(id, cage, user);
  }

  remove(id: string): Promise<ResponseSuccess> {
    const cageRemover = new CageRemover(this.mongoCageRepository);
    return cageRemover.execute(id);
  }
}
