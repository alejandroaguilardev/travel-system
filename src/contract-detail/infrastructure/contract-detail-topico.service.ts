import { BadRequestException, Injectable } from '@nestjs/common';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import { TopicoDto } from './dto/topico/topico.dto';
import { ContractDetailTopicoUpdater } from '../application/update/topico-updater';
import { CommandContractTopico } from '../application/update/command/topico-command';
import { ContractDetailUpdaterResponse } from '../application/response/contract-detail-update.response';
import { ContractTopico } from '../domain/value-object/contract-topico';
import { Uuid } from '../../common/domain/value-object/uuid';
import {
  AuthGroup,
  AuthPermission,
} from '../../common/domain/auth-permissions';
import { PermissionValidator } from '../../auth/application/permission/permission-validate';
import { LaravelApiAdapter } from '../../common/infrastructure/services/mail-api-adapter.service';
import { InfoDetailMail } from '../application/mail/info.detail-mail';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { TakeSampleMail } from '../application/mail/take-sample-mail';
import { TravelPersonMail } from '../application/mail/travel-person-mail';
import { JWTAdapterService } from '../../auth/infrastructure/services/jwt.service';
import { UbigeoQuery } from '../../ubigeo/infrastructure/ubigeo-query.service';

@Injectable()
export class ContractDetailTopicoService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly jwtService: JWTAdapterService,
    private readonly ubigeoQuery: UbigeoQuery,
    private readonly axiosAdapter: LaravelApiAdapter,
    private readonly dayJsService: DayJsService,
  ) {}

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

    return await contractDetailPetUpdater.execute(
      contractId,
      contractDetailId,
      topico,
      value as keyof typeof ContractTopico.keysTopicoObject,
      user,
    );
  }

  async mailTravelDetail(
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
    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS,
      AuthPermission.TOPICO,
    );

    const mail = new TravelPersonMail(
      this.axiosAdapter,
      this.ubigeoQuery,
      this.jwtService,
    );

    mail.execute(contract, contractDetail);
  }
  async mailTakingSample(
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
    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS,
      AuthPermission.TOPICO,
    );

    const mail = new TakeSampleMail(this.axiosAdapter, this.dayJsService);
    mail.execute(contract, contractDetail);
  }

  async mailDetail(
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
    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS,
      AuthPermission.TOPICO || AuthPermission.DOCUMENTATION,
    );

    const mail = new InfoDetailMail(this.axiosAdapter, this.dayJsService);
    mail.execute(contract, contractDetail);
  }
}
