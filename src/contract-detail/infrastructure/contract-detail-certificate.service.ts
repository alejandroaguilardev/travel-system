import { BadRequestException, Injectable } from '@nestjs/common';
import { MongoContractDetailRepository } from './persistence/contract-detail-mongo.repository';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import { MailContractService } from '../../mail/infrastructure/mail-contract.service';
import { ContractDetailCertificateUpdater } from '../application/update/certificate-updater';
import { CommandContractDocumentation } from '../application/update/command/command-documentation';
import { ContractDetailUpdaterResponse } from '../application/response/contract-detail-update.response';
import { ContractDocumentation } from '../domain/value-object/service-documentation';
import { DocumentationDto } from './dto';

@Injectable()
export class ContractDetailCertificateService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mongoContractDetailRepository: MongoContractDetailRepository,
    private readonly mailerService: MailContractService,
  ) {}

  updateCertificate(
    contractId: string,
    contractDetailId: string,
    value: string,
    certificateDto: DocumentationDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    if (!ContractDocumentation.keys.includes(value)) {
      throw new BadRequestException(
        'El formato de los  datos enviados no son correctos',
      );
    }

    const contractDetailPetUpdater = new ContractDetailCertificateUpdater(
      this.mongoContractRepository,
      this.mongoContractDetailRepository,
    );

    const certificate = CommandContractDocumentation[value](
      certificateDto[value],
      user.id,
    );

    return contractDetailPetUpdater.execute(
      contractId,
      contractDetailId,
      certificate,
      value as keyof typeof ContractDocumentation.keysObject,
      user,
    );
  }
}
