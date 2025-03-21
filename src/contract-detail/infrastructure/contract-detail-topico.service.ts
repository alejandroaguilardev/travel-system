import { BadRequestException, Injectable } from '@nestjs/common';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import { TopicoDto } from './dto/topico/topico.dto';
import { ContractDetailTopicoUpdater } from '../application/update/topico-updater';
import { CommandContractTopico } from '../application/update/command/topico-command';
import { ContractDetailUpdaterResponse } from '../application/response/contract-detail-update.response';
import { ContractTopico } from '../domain/value-object/contract-topico';
import { Uuid } from '../../common/domain/value-object/uuid';

import { LaravelApiAdapter } from '../../common/infrastructure/services/laravel-adapter.service';
import { InfoDetailNotification } from '../application/notification/info.detail-notification';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { TakeSampleNotification } from '../application/notification/take-sample-notification';
import { TravelPersonNotification } from '../application/notification/travel-person-notification';
import { JWTAdapterService } from '../../auth/infrastructure/services/jwt.service';
import { UbigeoQuery } from '../../ubigeo/infrastructure/ubigeo-query.service';
import { TakeSampleExecutedNotification } from '../application/notification/take-sample-executed-notification';
import { RabiesReVaccinationNotification } from '../application/notification/re-vaccination.notification';
import { MongoPetRepository } from '../../pets/infrastructure/persistence/mongo-pet.repository';
import { IncidentsService } from '../../errors/infrastructure/incidents.service';

@Injectable()
export class ContractDetailTopicoService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mongoPetRepository: MongoPetRepository,
    private readonly jwtService: JWTAdapterService,
    private readonly ubigeoQuery: UbigeoQuery,
    private readonly axiosAdapter: LaravelApiAdapter,
    private readonly dayJsService: DayJsService,
    private readonly incidentsService: IncidentsService
  ) { }

  async updateTopico(
    contractId: string,
    contractDetailId: string,
    value: string,
    topicoDto: TopicoDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    if (!ContractTopico.keysTopico.includes(value)) {
      throw new BadRequestException(
        'El formato de los  datos enviados no son correctos',
      );
    }

    const contractDetailPetUpdater = new ContractDetailTopicoUpdater(
      this.mongoContractRepository,
    );
    const topico = CommandContractTopico[value](topicoDto[value], user.id);
    const response = await contractDetailPetUpdater.execute(
      contractId,
      contractDetailId,
      topico,
      value as keyof typeof ContractTopico.keysTopicoObject,
      user,
    );

    this.mongoPetRepository.updateTopico(
      new Uuid(response.contractDetail.pet.id),
      CommandContractTopico.execute(response.contractDetail?.topico),
    );
    return response;
  }

  async mailTopicRabiesReVaccination(
    contractId: string,
    contractDetailId: string,
  ): Promise<void> {
    const contract = await this.mongoContractRepository.searchByIdWithPet(
      new Uuid(contractId),
    );
    const contractDetail = contract.details.find(
      (_) => _.id === contractDetailId,
    );

    const mail = new RabiesReVaccinationNotification(
      this.axiosAdapter,
      this.dayJsService,
      this.incidentsService,
    );

    mail.execute(contract, contractDetail);
  }

  async mailTravelDetail(
    contractId: string,
    contractDetailId: string,
  ): Promise<void> {
    const contract = await this.mongoContractRepository.searchByIdWithPet(
      new Uuid(contractId),
    );
    const contractDetail = contract.details.find(
      (_) => _.id === contractDetailId,
    );

    const mail = new TravelPersonNotification(
      this.axiosAdapter,
      this.ubigeoQuery,
      this.jwtService,
      this.incidentsService,
    );

    mail.execute(contract, contractDetail);
  }

  async mailTakingSample(
    contractId: string,
    contractDetailId: string,
  ): Promise<void> {
    const contract = await this.mongoContractRepository.searchByIdWithPet(
      new Uuid(contractId),
    );
    const contractDetail = contract.details.find(
      (_) => _.id === contractDetailId,
    );

    const mail = new TakeSampleNotification(
      this.axiosAdapter,
      this.dayJsService,
      this.incidentsService,
    );
    mail.execute(contract, contractDetail);
  }

  async mailTakingSampleExecuted(
    contractId: string,
    contractDetailId: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<void> {
    const contract = await this.mongoContractRepository.searchByIdWithPet(
      new Uuid(contractId),
    );
    const contractDetail = contract.details.find(
      (_) => _.id === contractDetailId,
    );

    const mail = new TakeSampleExecutedNotification(this.axiosAdapter, this.incidentsService);
    mail.execute(contract, contractDetail);
  }

  async mailDetail(
    contractId: string,
    contractDetailId: string,
    message: string,
  ): Promise<void> {
    const contract = await this.mongoContractRepository.searchByIdWithPet(
      new Uuid(contractId),
    );
    const contractDetail = contract.details.find(
      (_) => _.id === contractDetailId,
    );

    const mail = new InfoDetailNotification(this.axiosAdapter, this.incidentsService);
    mail.execute(contract, contractDetail, message);
  }
}
