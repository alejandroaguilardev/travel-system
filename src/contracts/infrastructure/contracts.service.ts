import { Injectable } from '@nestjs/common';
import { MongoContractRepository } from './persistence/contract-mongo.repository';
import { ResponseSuccess, ResponseSearch } from '../../common/domain/response';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { UserWithoutWithRoleResponse } from '../../users/application/response/user-without.response';
import { ContractCreator } from '../application/create/contract-creator';
import { ContractSearch } from '../application/search/contract-search';
import { ContractSearchById } from '../application/search-by-id/contract-search-by-id';
import { ContractRemover } from '../application/remove/contract-remover';
import { ContractResponse } from '../application/response/contract.response';
import { ContractSearchByIdClient } from '../application/search-contract-by-client/search-contract-by-client';
import { CommandContractCreator } from '../application/create';
import { ContractFinish } from '../application/finish/contract-finish';
import {
  CommandContractCage,
  CommandContractDocumentation,
  CommandContractTravel,
  ContractCageUpdater,
  ContractDocumentationUpdater,
  ContractTravelUpdater,
  ContractUpdater,
} from '../application/update';
import {
  CreateContractDto,
  UpdateContractDto,
  DocumentationDto,
  CageDto,
  TravelDto,
} from './dto/';

@Injectable()
export class ContractsService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
  ) {}

  create(
    createContractDto: CreateContractDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractsCreator = new ContractCreator(this.mongoContractRepository);
    const contract = CommandContractCreator.execute(createContractDto, user.id);
    return contractsCreator.execute(contract, user);
  }

  finish(id: string): Promise<ResponseSuccess> {
    const contractFinish = new ContractFinish(this.mongoContractRepository);
    return contractFinish.execute(id);
  }

  findAll(criteriaDto: CriteriaDto): Promise<ResponseSearch<ContractSearch>> {
    const contractSearch = new ContractSearch(this.mongoContractRepository);
    return contractSearch.execute(criteriaDto);
  }

  findOne(id: string): Promise<ContractResponse> {
    const contractSearchById = new ContractSearchById(
      this.mongoContractRepository,
    );
    return contractSearchById.execute(id);
  }

  findContractByClient(id: string): Promise<ContractResponse[]> {
    const contractSearchById = new ContractSearchByIdClient(
      this.mongoContractRepository,
    );
    return contractSearchById.execute(id);
  }

  update(
    id: string,
    updateContractDto: UpdateContractDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractUpdater = new ContractUpdater(this.mongoContractRepository);
    const contract = CommandContractCreator.execute(updateContractDto, user.id);
    return contractUpdater.execute(id, contract, user);
  }

  updateDocumentation(
    id: string,
    documentationDto: DocumentationDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse> {
    const contractDocumentationUpdater = new ContractDocumentationUpdater(
      this.mongoContractRepository,
    );

    const documentation =
      CommandContractDocumentation.execute(documentationDto);
    return contractDocumentationUpdater.execute(id, documentation, user);
  }

  updateCage(
    id: string,
    cageDto: CageDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse> {
    const contractDocumentationUpdater = new ContractCageUpdater(
      this.mongoContractRepository,
    );
    const cage = CommandContractCage.execute(cageDto);
    return contractDocumentationUpdater.execute(id, cage, user);
  }

  updateTravel(
    id: string,
    travelDto: TravelDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse> {
    const contractTravelUpdater = new ContractTravelUpdater(
      this.mongoContractRepository,
    );
    const travel = CommandContractTravel.execute(travelDto);
    return contractTravelUpdater.execute(id, travel, user);
  }

  remove(id: string): Promise<ResponseSuccess> {
    const contractRemover = new ContractRemover(this.mongoContractRepository);
    return contractRemover.execute(id);
  }
}
