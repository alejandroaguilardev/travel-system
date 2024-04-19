import { BadRequestException, Injectable } from '@nestjs/common';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import { MailContractService } from '../../mail/infrastructure/mail-contract.service';
import { ContractDetailCertificateUpdater } from '../application/update/certificate-updater';
import { CommandContractDocumentation } from '../application/update/command/command-documentation';
import { ContractDetailUpdaterResponse } from '../application/response/contract-detail-update.response';
import { ContractDocumentation } from '../domain/value-object/service-documentation';
import { DocumentationDto } from './dto';
import { Uuid } from '../../common/domain/value-object/uuid';
import { PermissionValidator } from '../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../common/domain/auth-permissions';

@Injectable()
export class ContractDetailCertificateService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mailerService: MailContractService,
  ) {}

  async updateCertificate(
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
    );

    const certificate = CommandContractDocumentation[value](
      certificateDto[value],
    );

    const response = await contractDetailPetUpdater.execute(
      contractId,
      contractDetailId,
      certificate,
      value as keyof typeof ContractDocumentation.keysObject,
      user,
    );
    return response;
  }

  async senasaIntroduceContract(
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
      AuthPermission.DOCUMENTATION,
    );

    if (
      contractDetail.documentation.senasaDocuments.executionDate &&
      !contractDetail.documentation.senasaDocuments.isApplied
    ) {
      this.mailerService.senasaIntroduceContract({
        contract,
        contractDetail,
      });
    }
  }
}
