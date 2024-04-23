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
import { ContractUpdater } from '../application/update';
import { CreateContractDto, UpdateContractDto } from './dto/';
import { ContractSearchClient } from '../application/search-client/search-client';
import { FolderContractDto } from './dto/folder-contract-dto';
import { ContractFolderUpdater } from '../application/update/folder-updater';
import { ContractCancel } from '../application/finish/contract-cancel';
import { ContractFinishClientUpdater } from '../application/finish/contract-finish-client-updater';
import { ContractCancelDto } from './dto/contract-cancel.dto';
import { ContractReasonForCancellation } from '../domain/value-object/reason-for-cancellation';
import { PayInInstallmentArrayDto } from './dto/pay-installment.dto';
import { ContractPayInInstallmentsUpdater } from '../application/update/payment-updater';
import { AxiosAdapter } from '../../common/infrastructure/services/http.service';
import { NewContractMail } from '../application/mail/new-contract-mail';

@Injectable()
export class ContractsService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mailerService: MailContractService,
    private readonly axiosAdapter: AxiosAdapter,
  ) {}

  async create(
    createContractDto: CreateContractDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractsCreator = new ContractCreator(this.mongoContractRepository);
    const contract = CommandContractCreator.execute(createContractDto, user.id);
    const response = await contractsCreator.execute(contract, user);
    const mail = new NewContractMail(
      this.mongoContractRepository,
      this.axiosAdapter,
    );
    mail.execute(contract.id);

    return response;
  }

  async finish(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractFinish = new ContractFinish(this.mongoContractRepository);

    const { contract, response } = await contractFinish.execute(id, user);
    this.mailerService.contractFinish(contract);
    return response;
  }

  async cancel(
    id: string,
    contractCancelDto: ContractCancelDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractFinish = new ContractCancel(this.mongoContractRepository);
    const reasonForCancellation = new ContractReasonForCancellation(
      contractCancelDto.reasonForCancellation,
    );

    const { contract, response } = await contractFinish.execute(
      id,
      reasonForCancellation,
      user,
    );
    this.mailerService.contractCancel(contract, reasonForCancellation);
    return response;
  }

  finishClient(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractFinish = new ContractFinishClientUpdater(
      this.mongoContractRepository,
    );
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
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse[]> {
    const contractSearchById = new ContractSearchByIdClient(
      this.mongoContractRepository,
    );
    return contractSearchById.execute(user);
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

    return contractUpdater.execute(id, contract, user);
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

  async updatePayInInstallment(
    id: string,
    payInInstallmentArrayDto: PayInInstallmentArrayDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractPayInInstallmentsUpdater =
      new ContractPayInInstallmentsUpdater(this.mongoContractRepository);
    return contractPayInInstallmentsUpdater.execute(
      id,
      payInInstallmentArrayDto.payInInstallments,
      user,
    );
  }

  async remove(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractRemover = new ContractRemover(this.mongoContractRepository);
    return contractRemover.execute(id, user);
  }
}
