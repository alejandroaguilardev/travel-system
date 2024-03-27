import { BadRequestException, Injectable } from '@nestjs/common';
import { MongoContractDetailRepository } from './persistence/contract-detail-mongo.repository';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import { MailContractService } from '../../mail/infrastructure/mail-contract.service';
import { TopicoDto } from './dto/topico/topico.dto';
import { ContractDetailTopicoUpdater } from '../application/update/topico-updater';
import { CommandContractTopico } from '../application/update/command/topico-command';
import { ContractDetailUpdaterResponse } from '../application/response/contract-detail-update.response';
import { ContractTopico } from '../domain/value-object/contract-topico';

@Injectable()
export class ContractDetailTopicoService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mongoContractDetailRepository: MongoContractDetailRepository,
    private readonly mailerService: MailContractService,
  ) {}

  updateTopico(
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
      this.mongoContractDetailRepository,
    );

    const topico = CommandContractTopico[value](topicoDto[value], user.id);

    return contractDetailPetUpdater.execute(
      contractId,
      contractDetailId,
      topico,
      value as keyof typeof ContractTopico.keysTopicoObject,
      user,
    );
  }
}
