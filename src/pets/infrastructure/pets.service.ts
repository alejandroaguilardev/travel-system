import { Injectable } from '@nestjs/common';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { MongoPetRepository } from './persistence/mongo-pet.repository';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ResponseSuccess, ResponseSearch } from '../../common/domain/response';
import { PetResponse } from '../domain/interfaces/pet.response';
import { PetCreator } from '../application/create/pet-creator';
import { CommandPetCreator } from '../application/create/command-pet-creator';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { CommandCriteria } from '../../common/application/criteria/command-criteria';
import { PetSearch } from '../application/search/pet-search';
import { PetSearchById } from '../application/search-by-id/pet-search-by-id';
import { PetUpdater } from '../application/update/pet-updater';
import { PetRemover } from '../application/remove/pet-remover';

@Injectable()
export class PetsService {
  constructor(private readonly mongoPetRepository: MongoPetRepository) {}

  create(
    createPetDto: CreatePetDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const cageCreator = new PetCreator(this.mongoPetRepository);
    const cage = CommandPetCreator.execute(createPetDto, user.id);
    return cageCreator.create(cage, user);
  }

  findAll(
    criteriaDto: CriteriaDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<PetResponse>> {
    const cageSearch = new PetSearch(this.mongoPetRepository);
    const criteria = CommandCriteria.fromData(criteriaDto);
    return cageSearch.execute(criteria, user);
  }

  findOne(id: string, user: UserWithoutWithRoleResponse): Promise<PetResponse> {
    const cageSearchById = new PetSearchById(this.mongoPetRepository);
    return cageSearchById.execute(id, user);
  }

  update(
    id: string,
    updatePetDto: UpdatePetDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const cageUpdater = new PetUpdater(this.mongoPetRepository);
    const cage = CommandPetCreator.execute(updatePetDto, user.id);
    return cageUpdater.execute(id, cage, user);
  }

  remove(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const cageRemover = new PetRemover(this.mongoPetRepository);
    return cageRemover.execute(id, user);
  }
}
