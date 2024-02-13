import { DocumentationInterface, StatusInterface } from '../../interfaces';
import { ContractStatus } from '../../../../common/domain/value-object/contract-status';
import {
  DocumentationVaccinationCertificate,
  DocumentationHealthCertificate,
  DocumentationChipCertificate,
  DocumentationSenasaDocuments,
  DocumentationRabiesSerologicalTest,
  DocumentationImportLicense,
  DocumentationEmocionalSupportCertificate,
} from './documentation';

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

  toJson(): DocumentationInterface {
    return {
      status: this.status.value as StatusInterface,
      vaccinationCertificate: this.vaccinationCertificate.toJson(),
      healthCertificate: this.healthCertificate.toJson(),
      chipCertificate: this.chipCertificate.toJson(),
      senasaDocuments: this.senasaDocuments.toJson(),
      rabiesSeroLogicalTest: this.rabiesSeroLogicalTest.toJson(),
      importLicense: this.importLicense.toJson(),
      emotionalSupportCertificate: this.emotionalSupportCertificate.toJson(),
    };
  }

  documentationIsApplied(): void {
    let count = 0;

    Object.keys(this).forEach((key) => {
      if (typeof this[key]?.hasServiceIncluded?.value == 'boolean') {
        this[key].isApplied.value = this[key].isApplied.value;
        if (this[key]?.isApplied.value) {
          ++count;
        }
      }
    });

    if (count === 7) {
      this.status.value = 'completed';
    } else if (count > 0) {
      this.status.value = 'in-process';
    } else {
      this.status.value = 'pending';
    }
  }
}
