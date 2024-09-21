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
import { LaravelApiAdapter } from '../../common/infrastructure/services/laravel-adapter.service';
import { NewContractNotification } from '../application/notification/new-contract-notification';
import { CancelContractNotification } from '../application/notification/cancel-contract-notification';
import { FinishContractNotification } from '../application/notification/finish-contract-notification';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { IncidentsService } from '../../errors/infrastructure/incidents.service';
import { Uuid } from '../../common/domain/value-object/uuid';

@Injectable()
export class ContractsService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly axiosAdapter: LaravelApiAdapter,
    private readonly dateService: DayJsService,
    private readonly incidentsService: IncidentsService,
  ) { }

  async create(
    createContractDto: CreateContractDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractsCreator = new ContractCreator(this.mongoContractRepository);
    const contract = CommandContractCreator.execute(createContractDto, user.id);
    const response = await contractsCreator.execute(contract, user);
    return response;
  }

  async finish(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractFinish = new ContractFinish(this.mongoContractRepository);

    const { contract, response } = await contractFinish.execute(id, user);

    const mail = new FinishContractNotification(
      this.mongoContractRepository,
      this.axiosAdapter,
      this.incidentsService,
    );
    mail.execute(contract.id);
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
    const mail = new CancelContractNotification(
      this.mongoContractRepository,
      this.axiosAdapter,
      this.incidentsService,
    );
    mail.execute(contract.id);
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

  async notificationNewContract(contractId: string) {
    const mail = new NewContractNotification(
      this.mongoContractRepository,
      this.axiosAdapter,
      this.dateService,
      this.incidentsService,
    );
    mail.execute(new Uuid(contractId));
  }
}
