import { Injectable } from '@nestjs/common';
import { MongoContractRepository } from './persistence/contract-mongo.repository';
import { ResponseSuccess, ResponseSearch } from '../../common/domain/response';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { ContractCreator } from '../application/create/contract-creator';
import { ContractSearch } from '../application/search/contract-search';
import { ContractSearchById } from '../application/search-by-id/contract-search-by-id';
import { ContractRemover } from '../application/remove/contract-remover';
import {
  ContractResponse,
  ContractWithDetailsResponse,
} from '../application/response/contract.response';
import { ContractSearchByIdClient } from '../application/search-contract-by-client/search-contract-by-client';
import { CommandContractCreator } from '../application/create';
import { ContractFinish } from '../application/finish/contract-finish';
import { MailContractService } from '../../mail/infrastructure/mail-contract.service';
import { CommandContractUpdater, ContractUpdater } from '../application/update';
import { CreateContractDto, UpdateContractDto } from './dto/';
import { ContractDetailService } from '../../contract-detail/infrastructure/contract-detail.service';
import { MongoContractDetailRepository } from '../../contract-detail/infrastructure/persistence/contract-detail-mongo.repository';
import { ContractSearchClient } from '../application/search-client/search-client';
import { FolderContractDto } from './dto/folder-contract-dto';
import { ContractFolderUpdater } from '../application/update/folder-updater';
import { ContractCancel } from '../application/finish/contract-cancel';

@Injectable()
export class ContractsService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mongoContractDetailRepository: MongoContractDetailRepository,
    private readonly mailerService: MailContractService,
    private readonly contractDetailService: ContractDetailService,
  ) {}

  async create(
    createContractDto: CreateContractDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractsCreator = new ContractCreator(this.mongoContractRepository);
    const contract = CommandContractCreator.execute(createContractDto, user.id);
    const contractDetails = CommandContractCreator.details(
      createContractDto,
      user.id,
    );

    const response = await contractsCreator.execute(
      contract,
      contractDetails,
      user,
    );
    await this.contractDetailService.create(contractDetails, user);
    this.mailerService.new(contract);
    return response;
  }

  finish(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractFinish = new ContractFinish(this.mongoContractRepository);
    return contractFinish.execute(id, user);
  }

  cancel(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractFinish = new ContractCancel(this.mongoContractRepository);
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
  ): Promise<ContractWithDetailsResponse> {
    const contractSearchById = new ContractSearchById(
      this.mongoContractRepository,
      this.mongoContractDetailRepository,
    );
    return contractSearchById.execute(id, user);
  }

  findContractByClient(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractWithDetailsResponse[]> {
    const contractSearchById = new ContractSearchByIdClient(
      this.mongoContractRepository,
      this.mongoContractDetailRepository,
    );
    return contractSearchById.execute(id, user);
  }

  findAllClient(
    criteriaDto: CriteriaDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<ContractResponse>> {
    const contractSearch = new ContractSearchClient(
      this.mongoContractRepository,
    );
    return contractSearch.execute(criteriaDto, user);
  }

  async update(
    id: string,
    updateContractDto: UpdateContractDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractUpdater = new ContractUpdater(this.mongoContractRepository);
    const contract = CommandContractCreator.execute(updateContractDto, user.id);
    const contractDetails = CommandContractUpdater.details(
      updateContractDto,
      user.id,
    );

    await this.contractDetailService.update(contractDetails, user);
    return contractUpdater.execute(id, contract, contractDetails, user);
  }

  async updateFolder(
    id: string,
    folderContractDto: FolderContractDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractFolderUpdater = new ContractFolderUpdater(
      this.mongoContractRepository,
    );
    return contractFolderUpdater.execute(id, folderContractDto, user);
  }

  async remove(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractRemover = new ContractRemover(this.mongoContractRepository);
    return contractRemover.execute(id, user);
  }
}
