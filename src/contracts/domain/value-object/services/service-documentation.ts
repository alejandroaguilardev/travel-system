import { DocumentationChipCertificate } from './documentation/documentation-chip-certificate';
import { DocumentationEmocionalSupportCertificate } from './documentation/documentation-emotional-support-certificate';
import { DocumentationHealthCertificate } from './documentation/documentation-health-certificate';
import { DocumentationImportLicense } from './documentation/documentation-import-license';
import { DocumentationRabiesSerologicalTest } from './documentation/documentation-rabies-serological-test';
import { DocumentationSenasaDocuments } from './documentation/documentation-senasa-documents';
import { DocumentationVaccinationCertificate } from './documentation/documentation-vaccination-certificate';
import { ContractStatus } from '../contract-status';
import { DocumentationDefinition } from '../../interfaces/documentation';
import { StatusDefinition } from '../../interfaces/status';
import { ContractResponse } from '../../../../contracts/application/response/contract.response';
import { ContractDefinition } from '../../interfaces/contract';

export class ContractDocumentation {
  constructor(
    readonly status: ContractStatus,
    readonly vaccinationCertificate: DocumentationVaccinationCertificate,
    readonly healthCertificate: DocumentationHealthCertificate,
    readonly chipCertificate: DocumentationChipCertificate,
    readonly senasaDocuments: DocumentationSenasaDocuments,
    readonly rabiesSeroLogicalTest: DocumentationRabiesSerologicalTest,
    readonly importLicense: DocumentationImportLicense,
    readonly emotionalSupportCertificate: DocumentationEmocionalSupportCertificate,
  ) {}

  toJson(): DocumentationDefinition {
    return {
      status: this.status.value as StatusDefinition,
      vaccinationCertificate: this.vaccinationCertificate.toJson(),
      healthCertificate: this.healthCertificate.toJson(),
      chipCertificate: this.chipCertificate.toJson(),
      senasaDocuments: this.senasaDocuments.toJson(),
      rabiesSeroLogicalTest: this.rabiesSeroLogicalTest.toJson(),
      importLicense: this.importLicense.toJson(),
      emotionalSupportCertificate: this.emotionalSupportCertificate.toJson(),
    };
  }

  static documentationIsApplied(
    contract: ContractResponse,
    documentationRequest: DocumentationDefinition,
  ): ContractDefinition {
    let count = 0;

    Object.keys(contract.services.documentation).forEach((key) => {
      if (
        typeof contract.services.documentation[key]?.hasServiceIncluded ==
        'boolean'
      ) {
        // if (!contract.services.documentation[key]?.hasServiceIncluded) {
        contract.services.documentation[key].isApplied =
          documentationRequest[key].isApplied;
        // }
        if (contract.services.documentation[key]?.isApplied) {
          ++count;
        }
      }
    });

    if (count === 7) {
      contract.services.documentation.status = 'completed';
    } else if (count > 0) {
      contract.services.documentation.status = 'in-process';
    } else {
      contract.services.documentation.status = 'pending';
    }
    return contract;
  }
}
