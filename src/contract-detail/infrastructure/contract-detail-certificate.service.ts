import { BadRequestException, Injectable } from '@nestjs/common';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
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
import { SendMailSenasaIntroduce } from '../application/mail/senasa-mail';
import { LaravelApiAdapter } from '../../common/infrastructure/services/mail-api-adapter.service';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { SenasaExcelDownload } from '../application/download/senasa-excel';
import { CertificateExcelDownload } from '../application/download/certificate-excel';
import { UbigeoQuery } from '../../ubigeo/infrastructure/ubigeo-query.service';

@Injectable()
export class ContractDetailCertificateService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly ubigeoQuery: UbigeoQuery,
    private readonly axiosAdapter: LaravelApiAdapter,
    private readonly dayJsService: DayJsService,
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
      const mail = new SendMailSenasaIntroduce(
        this.axiosAdapter,
        this.dayJsService,
      );
      mail.execute(contract, contractDetail);
    }
  }

  async senasaExcelDownload(
    contractId: string,
    contractDetailId: string,
    user: UserWithoutWithRoleResponse,
  ) {
    const excel = new SenasaExcelDownload(
      this.mongoContractRepository,
      this.axiosAdapter,
      this.dayJsService,
      this.ubigeoQuery,
    );
    return excel.execute(
      new Uuid(contractId),
      new Uuid(contractDetailId),
      user,
    );
  }

  async certificateExcelDownload(
    contractId: string,
    contractDetailId: string,
    certificate: string,
    user: UserWithoutWithRoleResponse,
  ) {
    const excel = new CertificateExcelDownload(
      this.mongoContractRepository,
      this.axiosAdapter,
      this.dayJsService,
      this.ubigeoQuery,
    );
    return excel.execute(
      new Uuid(contractId),
      new Uuid(contractDetailId),
      certificate,
      user,
    );
  }
}
