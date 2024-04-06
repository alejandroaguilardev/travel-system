import { DocumentationInterface, StatusInterface } from '../interfaces';
import { ContractStatus } from '../../../common/domain/value-object/contract-status';
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
  static keys = [
    'vaccinationCertificate',
    'healthCertificate',
    'chipCertificate',
    'senasaDocuments',
    'rabiesSeroLogicalTest',
    'importLicense',
    'emotionalSupportCertificate',
  ];
  static keysObject = {
    vaccinationCertificate: 'vaccinationCertificate',
    healthCertificate: 'healthCertificate',
    chipCertificate: 'chipCertificate',
    senasaDocuments: 'senasaDocuments',
    rabiesSeroLogicalTest: 'rabiesSeroLogicalTest',
    importLicense: 'importLicense',
    emotionalSupportCertificate: 'emotionalSupportCertificate',
  };
  constructor(
    public status: ContractStatus,
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

  setStatus(status: StatusInterface): void {
    this.status = new ContractStatus(status);
  }

  documentationIsApplied(data: DocumentationInterface): StatusInterface {
    let count = 0;
    let isRequired = 0;

    Object.keys(data).forEach((key) => {
      if (data[key]?.isRequired) {
        ++isRequired;
      }

      if (data[key]?.isApplied) {
        ++count;
      }
    });

    if (count === isRequired) {
      return 'completed';
    } else if (count > 0) {
      return 'in-process';
    } else {
      return 'pending';
    }
  }
}
