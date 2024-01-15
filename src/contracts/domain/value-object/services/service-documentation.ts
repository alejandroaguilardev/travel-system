import { DocumentationChipCertificate } from './documentation/documentation-chip-certificate';
import { ContractHasServiceIncluded } from '../contract-has-service.included';
import { DocumentationEmocionalSupportCertificate } from './documentation/documentation-emotional-support-certificate';
import { DocumentationHealthCertificate } from './documentation/documentation-health-certificate';
import { DocumentationImportLicense } from './documentation/documentation-import-license';
import { DocumentationRabiesSerologicalTest } from './documentation/documentation-rabies-serological-test';
import { DocumentationSenasaDocuments } from './documentation/documentation-senasa-documents';
import { DocumentationVaccinationCertificate } from './documentation/documentation-vaccination-certificate';
import { ContractStatus } from '../contract-status';
import { DocumentationDefinition } from '../../interfaces/documentation';
import { StatusDefinition } from '../../interfaces/status';

export class ContractDocumentation {
  constructor(
    readonly status: ContractStatus,
    public hasServiceIncluded: ContractHasServiceIncluded,
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
      hasServiceIncluded: this.hasServiceIncluded.value,
      vaccinationCertificate: this.vaccinationCertificate.toJson(),
      healthCertificate: this.healthCertificate.toJson(),
      chipCertificate: this.chipCertificate.toJson(),
      senasaDocuments: this.senasaDocuments.toJson(),
      rabiesSeroLogicalTest: this.rabiesSeroLogicalTest.toJson(),
      importLicense: this.importLicense.toJson(),
      emotionalSupportCertificate: this.emotionalSupportCertificate.toJson(),
    };
  }

  setHasServiceIncluded(healthCertificate: boolean) {
    return (this.hasServiceIncluded = new ContractHasServiceIncluded(
      healthCertificate,
    ));
  }
}
