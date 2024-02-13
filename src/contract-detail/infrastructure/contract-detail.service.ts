import { Injectable } from '@nestjs/common';
import { MongoContractDetailRepository } from './persistence/contract-mongo.repository';
import { CageDto, CreateContractDetailDto, DocumentationDto } from './dto';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { ResponseSearch, ResponseSuccess } from '../../common/domain/response';
import {
  CommandContractCreator,
  ContractDetailCreator,
} from '../application/create';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { ContractDetailResponse } from '../application/response/contract-detail.response';
import { ContractDetailSearch } from '../application/search/contract-detail-search';
import { ContractDetailSearchById } from '../application/search-by-id/contract-detail-search-by-id';
import { TravelDto } from '../../contracts/infrastructure/dto';
import {
  CommandContractCage,
  CommandContractDocumentation,
  CommandContractTravel,
  ContractDetailCageUpdater,
  ContractDetailDocumentationUpdater,
  ContractDetailTravelUpdater,
} from '../application/update';
import { ContractDetailUpdaterResponse } from '../application/response/contract-detail-update.response';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import { ContractDetailRemover } from '../application/remove/contract-detail-remover';

@Injectable()
export class ContractDetailService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mongoContractDetailRepository: MongoContractDetailRepository,
  ) {}

  async create(
    createContractDto: CreateContractDetailDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractsCreator = new ContractDetailCreator(
      this.mongoContractDetailRepository,
    );
    const contract = CommandContractCreator.execute(createContractDto, user.id);
    return await contractsCreator.execute(contract, user);
  }

  findAll(
    criteriaDto: CriteriaDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<ContractDetailResponse>> {
    const contractSearch = new ContractDetailSearch(
      this.mongoContractDetailRepository,
    );
    return contractSearch.execute(criteriaDto, user);
  }

  findOne(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailResponse> {
    const contractSearchById = new ContractDetailSearchById(
      this.mongoContractDetailRepository,
    );
    return contractSearchById.execute(id, user);
  }

  updateDocumentation(
    contractId: string,
    contractDetailId: string,
    documentationDto: DocumentationDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractDocumentationUpdater = new ContractDetailDocumentationUpdater(
      this.mongoContractRepository,
      this.mongoContractDetailRepository,
    );

    const documentation =
      CommandContractDocumentation.execute(documentationDto);
    return contractDocumentationUpdater.execute(
      contractId,
      contractDetailId,
      documentation,
      user,
    );
  }

  updateCage(
    contractId: string,
    contractDetailId: string,
    cageDto: CageDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractDocumentationUpdater = new ContractDetailCageUpdater(
      this.mongoContractRepository,
      this.mongoContractDetailRepository,
    );
    const cage = CommandContractCage.execute(cageDto);
    return contractDocumentationUpdater.execute(
      contractId,
      contractDetailId,
      cage,
      user,
    );
  }

  updateTravel(
    contractId: string,
    contractDetailId: string,
    travelDto: TravelDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractTravelUpdater = new ContractDetailTravelUpdater(
      this.mongoContractRepository,
      this.mongoContractDetailRepository,
    );
    const travel = CommandContractTravel.execute(travelDto);
    return contractTravelUpdater.execute(
      contractId,
      contractDetailId,
      travel,
      user,
    );
  }

  remove(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractRemover = new ContractDetailRemover(
      this.mongoContractDetailRepository,
    );
    return contractRemover.execute(id, user);
  }
}
