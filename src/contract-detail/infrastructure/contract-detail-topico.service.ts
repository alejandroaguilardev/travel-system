import { BadRequestException, Injectable } from '@nestjs/common';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import { MailContractService } from '../../mail/infrastructure/mail-contract.service';
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

@Injectable()
export class ContractDetailTopicoService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mailerService: MailContractService,
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

    const response = await contractDetailPetUpdater.execute(
      contractId,
      contractDetailId,
      topico,
      value as keyof typeof ContractTopico.keysTopicoObject,
      user,
    );

    if (value !== ContractTopico.keysTopicoObject.chipReview) {
      this.mailerService.updateDetail(response);
    }

    if (
      value !== ContractTopico.keysTopicoObject.takingSampleSerologicalTest &&
      response.contractDetail.topico.takingSampleSerologicalTest.executed
    ) {
      this.mailerService.travelPersonContract(response);
    }
    return response;
  }

  async updateMeasurementMail(
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

    this.mailerService.updateDetail({
      contract,
      contractDetail,
    });
  }
}
