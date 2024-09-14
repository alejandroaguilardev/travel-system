import { Injectable } from '@nestjs/common';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { MongoPetRepository } from './persistence/mongo-pet.repository';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ResponseSuccess, ResponseSearch } from '../../common/domain/response';
import { PetResponse, PetsClientResponse } from '../domain/interfaces/pet.response';
import { PetCreator } from '../application/create/pet-creator';
import { CommandPetCreator } from '../application/create/command-pet-creator';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { CommandCriteria } from '../../common/application/criteria/command-criteria';
import { PetSearch } from '../application/search/pet-search';
import { PetSearchById } from '../application/search-by-id/pet-search-by-id';
import { PetUpdater } from '../application/update/pet-updater';
import { PetRemover } from '../application/remove/pet-remover';
import { PetChipDto } from './dto/pet-chip.dto';
import { PetChip } from '../domain/value-object/pet-chip';
import { PetChipDate } from '../domain/value-object/pet-chip-date';
import { PetChipUpdater } from '../application/update/pet-chip-updater';
import { PetSearchByClient } from '../application/search-by-id/pet-client-search';

@Injectable()
export class PetsService {
  constructor(private readonly mongoPetRepository: MongoPetRepository) { }

  create(
    createPetDto: CreatePetDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const petCreator = new PetCreator(this.mongoPetRepository);
    const pet = CommandPetCreator.execute(createPetDto, user.id);
    return petCreator.create(pet, user);
  }

  findAll(
    criteriaDto: CriteriaDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<PetResponse>> {
    const petSearch = new PetSearch(this.mongoPetRepository);
    const criteria = CommandCriteria.fromData(criteriaDto);
    return petSearch.execute(criteria, user);
  }

  findOne(id: string, user: UserWithoutWithRoleResponse): Promise<PetResponse> {
    const petSearchById = new PetSearchById(this.mongoPetRepository);
    return petSearchById.execute(id, user);
  }

  findClientPets(idClient: string, user: UserWithoutWithRoleResponse): Promise<PetsClientResponse[]> {
    const petSearchByClient = new PetSearchByClient(this.mongoPetRepository);
    return petSearchByClient.execute(idClient, user);
  }

  update(
    id: string,
    updatePetDto: UpdatePetDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const petUpdater = new PetUpdater(this.mongoPetRepository);
    const pet = CommandPetCreator.execute(updatePetDto, user.id);
    return petUpdater.execute(id, pet, user);
  }

  updateChip(
    id: string,
    petChipDto: PetChipDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const petUpdater = new PetChipUpdater(this.mongoPetRepository);
    const chip = new PetChip(petChipDto.chip);
    const chipDate = new PetChipDate(petChipDto.chipDate);
    return petUpdater.execute(id, chip, chipDate, user);
  }

  remove(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const petRemover = new PetRemover(this.mongoPetRepository);
    return petRemover.execute(id, user);
  }
}
