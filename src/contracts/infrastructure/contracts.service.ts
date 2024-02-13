import { Injectable } from '@nestjs/common';
import { MongoContractRepository } from './persistence/contract-mongo.repository';
import { ResponseSuccess, ResponseSearch } from '../../common/domain/response';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { ContractCreator } from '../application/create/contract-creator';
import { ContractSearch } from '../application/search/contract-search';
import { ContractSearchById } from '../application/search-by-id/contract-search-by-id';
import { ContractRemover } from '../application/remove/contract-remover';
import { ContractResponse } from '../application/response/contract.response';
import { ContractSearchByIdClient } from '../application/search-contract-by-client/search-contract-by-client';
import { CommandContractCreator } from '../application/create';
import { ContractFinish } from '../application/finish/contract-finish';
import { MailContractService } from '../../mail/infrastructure/mail-contract.service';
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
    private readonly mailerService: MailContractService,
  ) {}

  async create(
    createContractDto: CreateContractDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractsCreator = new ContractCreator(this.mongoContractRepository);
    const contract = CommandContractCreator.execute(createContractDto, user.id);
    const response = await contractsCreator.execute(contract, user);
    this.mailerService.new(user.email, contract.toJson());
    return response;
  }

  finish(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractFinish = new ContractFinish(this.mongoContractRepository);
    return contractFinish.execute(id, user);
  }

  findAll(
    criteriaDto: CriteriaDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<ContractResponse>> {
    const contractSearch = new ContractSearch(this.mongoContractRepository);
    return contractSearch.execute(criteriaDto, user);
  }

  findOne(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse> {
    const contractSearchById = new ContractSearchById(
      this.mongoContractRepository,
    );
    return contractSearchById.execute(id, user);
  }

  findContractByClient(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse[]> {
    const contractSearchById = new ContractSearchByIdClient(
      this.mongoContractRepository,
    );
    return contractSearchById.execute(id, user);
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

  remove(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractRemover = new ContractRemover(this.mongoContractRepository);
    return contractRemover.execute(id, user);
  }
}
