import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractDocumentation } from '../../domain/value-object/service-documentation';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { AuthPermission } from '../../../common/domain/auth-permissions';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { CommandContractUpdater } from '../../../contracts/application/update/command-contract-updater';
import { EnsureContractDetail } from './ensure-contract-detail';
import {
  DocumentationCertificateInterface,
  DocumentationInterface,
} from '../../../contract-detail/domain/interfaces/documentation.interface';

export class ContractDetailDocumentationUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    contractDetailId: string,
    documentation: ContractDocumentation,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractUuid = new Uuid(contractId);
    const contractDetailUuid = new Uuid(contractDetailId);

    const ensureContractDetail = new EnsureContractDetail(
      this.contractRepository,
    );
    const { contractResponse, contractDetailResponse } =
      await ensureContractDetail.searchEnsure(contractUuid, contractDetailUuid);

    ensureContractDetail.hasPermission(
      user,
      contractResponse,
      AuthPermission.DOCUMENTATION,
    );

    const contractDetail = {
      ...contractDetailResponse,
      documentation: this.formatDocumentation(
        documentation,
        contractDetailResponse.documentation,
      ),
    };

    contractDetail.documentation.clientStatus =
      documentation.documentationClientIsApplied(contractDetail.documentation);

    const contract = CommandContractUpdater.execute({
      ...contractResponse,
      details: contractResponse.details.map((_) =>
        _.id === contractDetail.id ? contractDetail : _,
      ),
    });

    contract.status.client.statusError(contract.endDate.value);

    contract.establishedClientStatus();

    await this.contractRepository.update(contractUuid, contract);

    const response =
      await this.contractRepository.searchByIdWithPet(contractUuid);

    return {
      contract: response,
      contractDetail: response.details.find((_) => _.id === contractDetail.id),
    };
  }

  private formatDocumentation(
    contractDocumentation: ContractDocumentation,
    oldDocumentation: DocumentationInterface,
  ) {
    const docs = contractDocumentation.toJson();
    return {
      ...oldDocumentation,
      vaccinationCertificate: this.formatCertificate(
        oldDocumentation.vaccinationCertificate,
        docs.vaccinationCertificate,
      ),

      healthCertificate: this.formatCertificate(
        oldDocumentation.healthCertificate,
        docs.healthCertificate,
      ),

      chipCertificate: this.formatCertificate(
        oldDocumentation.chipCertificate,
        docs.chipCertificate,
      ),

      senasaDocuments: this.formatCertificate(
        oldDocumentation.senasaDocuments,
        docs.senasaDocuments,
      ),

      rabiesSeroLogicalTest: this.formatCertificate(
        oldDocumentation.rabiesSeroLogicalTest,
        docs.rabiesSeroLogicalTest,
      ),

      importLicense: this.formatCertificate(
        oldDocumentation.importLicense,
        docs.importLicense,
      ),

      emotionalSupportCertificate: this.formatCertificate(
        oldDocumentation.emotionalSupportCertificate,
        docs.emotionalSupportCertificate,
      ),
    };
  }

  private formatCertificate(
    value: DocumentationCertificateInterface,
    newValue: DocumentationCertificateInterface,
  ) {
    return value.hasServiceIncluded ? value : newValue;
  }
}
