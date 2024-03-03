import { Injectable } from '@nestjs/common';
import { MongoContractDetailRepository } from './persistence/contract-detail-mongo.repository';
import { CageDto, DocumentationDto } from './dto';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { ResponseSearch, ResponseSuccess } from '../../common/domain/response';
import { ContractDetailCreator } from '../application/create';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { ContractDetailResponse } from '../application/response/contract-detail.response';
import { ContractDetailSearch } from '../application/search/contract-detail-search';
import { ContractDetailSearchById } from '../application/search-by-id/contract-detail-search-by-id';
import { TravelDto } from '../../contract-detail/infrastructure/dto';
import {
  CommandContractCage,
  CommandContractDocumentation,
  CommandContractTravel,
  ContractDetailCageUpdater,
  ContractDetailDocumentationUpdater,
  ContractDetailTravelUpdater,
  ContractDetailUpdater,
} from '../application/update';
import { ContractDetailUpdaterResponse } from '../application/response/contract-detail-update.response';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import { ContractDetailRemover } from '../application/remove/contract-detail-remover';
import { ContractDetail } from '../domain/contract-detail';
import { MailContractService } from '../../mail/infrastructure/mail-contract.service';

@Injectable()
export class ContractDetailService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mongoContractDetailRepository: MongoContractDetailRepository,
    private readonly mailerService: MailContractService,
  ) {}

  async create(
    contractDetails: ContractDetail[],
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractDetailCreator = new ContractDetailCreator(
      this.mongoContractDetailRepository,
    );
    return await contractDetailCreator.execute(contractDetails, user);
  }

  async update(
    contractDetails: ContractDetail[],
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractDetailUpdater = new ContractDetailUpdater(
      this.mongoContractDetailRepository,
    );
    return await contractDetailUpdater.execute(contractDetails, user);
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

  async updateDocumentation(
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

    const response = await contractDocumentationUpdater.execute(
      contractId,
      contractDetailId,
      documentation,
      user,
    );

    this.mailerService.updateDocumentation(response);

    return response;
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
