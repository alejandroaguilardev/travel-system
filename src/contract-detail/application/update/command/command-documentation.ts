import {
  ContractStatusDetail,
  UuidOptional,
} from '../../../../common/domain/value-object';
import {
  DocumentationCertificateInterface,
  DocumentationInterface,
} from '../../../domain/interfaces';
import { ContractDocumentation } from '../../../domain/value-object';
import { DocumentationResultDate } from '../../../domain/value-object/documentation/documentation-result-date';
import {
  DocumentationVaccinationCertificate,
  DocumentationIsApplied,
  DocumentationExpectedDate,
  DocumentationExecutionDate,
  DocumentationHealthCertificate,
  DocumentationChipCertificate,
  DocumentationSenasaDocuments,
  DocumentationRabiesSerologicalTest,
  DocumentationImportLicense,
  DocumentationEmocionalSupportCertificate,
  DocumentationIsRequired,
  DocumentationIsPrint,
  DocumentationObservation,
} from '../../../domain/value-object/documentation';

export class CommandContractDocumentation {
  static execute(documentation: DocumentationInterface): ContractDocumentation {
    return new ContractDocumentation(
      new ContractStatusDetail(
        documentation?.status === 'none' ? 'pending' : documentation.status,
      ),
      new ContractStatusDetail(
        documentation?.clientStatus === 'none'
          ? 'pending'
          : documentation.clientStatus,
      ),
      this.vaccinationCertificate(documentation.vaccinationCertificate),
      this.healthCertificate(documentation.healthCertificate),
      this.chipCertificate(documentation.chipCertificate),
      this.senasaDocuments(documentation.senasaDocuments),
      this.rabiesSeroLogicalTest(documentation.rabiesSeroLogicalTest),
      this.importLicense(documentation.importLicense),
      this.emotionalSupportCertificate(
        documentation.emotionalSupportCertificate,
      ),
    );
  }
  static vaccinationCertificate(
    vaccinationCertificate: DocumentationCertificateInterface,
  ): DocumentationVaccinationCertificate {
    return new DocumentationVaccinationCertificate(
      new DocumentationIsApplied(vaccinationCertificate.isApplied),
      new DocumentationIsApplied(vaccinationCertificate.hasServiceIncluded),
      new DocumentationExpectedDate(vaccinationCertificate.expectedDate),
      new DocumentationExecutionDate(vaccinationCertificate.executionDate),
      new DocumentationResultDate(vaccinationCertificate.resultDate),
      new DocumentationIsRequired(vaccinationCertificate.isRequired),
      new DocumentationObservation(vaccinationCertificate.observation),
      new DocumentationIsPrint(vaccinationCertificate.isPrint),
      new UuidOptional(vaccinationCertificate?.user ?? ''),
    );
  }

  static healthCertificate(
    healthCertificate: DocumentationCertificateInterface,
  ): DocumentationVaccinationCertificate {
    return new DocumentationHealthCertificate(
      new DocumentationIsApplied(healthCertificate.isApplied),
      new DocumentationIsApplied(healthCertificate.hasServiceIncluded),
      new DocumentationExpectedDate(healthCertificate.expectedDate),
      new DocumentationExecutionDate(healthCertificate.executionDate),
      new DocumentationResultDate(healthCertificate.resultDate),
      new DocumentationIsRequired(healthCertificate.isRequired),
      new DocumentationObservation(healthCertificate.observation),
      new DocumentationIsPrint(healthCertificate.isPrint),
      new UuidOptional(healthCertificate?.user ?? ''),
    );
  }

  static chipCertificate(
    chipCertificate: DocumentationCertificateInterface,
  ): DocumentationVaccinationCertificate {
    return new DocumentationChipCertificate(
      new DocumentationIsApplied(chipCertificate.isApplied),
      new DocumentationIsApplied(chipCertificate.hasServiceIncluded),
      new DocumentationExpectedDate(chipCertificate.expectedDate),
      new DocumentationExecutionDate(chipCertificate.executionDate),
      new DocumentationResultDate(chipCertificate.resultDate),
      new DocumentationIsRequired(chipCertificate.isRequired),
      new DocumentationObservation(chipCertificate.observation),
      new DocumentationIsPrint(chipCertificate.isPrint),
      new UuidOptional(chipCertificate?.user ?? ''),
    );
  }

  static senasaDocuments(
    senasaDocuments: DocumentationCertificateInterface,
  ): DocumentationVaccinationCertificate {
    return new DocumentationSenasaDocuments(
      new DocumentationIsApplied(senasaDocuments.isApplied),
      new DocumentationIsApplied(senasaDocuments.hasServiceIncluded),
      new DocumentationExpectedDate(senasaDocuments.expectedDate),
      new DocumentationExecutionDate(senasaDocuments.executionDate),
      new DocumentationResultDate(senasaDocuments.resultDate),
      new DocumentationIsRequired(senasaDocuments.isRequired),
      new DocumentationObservation(senasaDocuments.observation),
      new DocumentationIsPrint(senasaDocuments.isPrint),
      new UuidOptional(senasaDocuments?.user ?? ''),
    );
  }

  static rabiesSeroLogicalTest(
    rabiesSeroLogicalTest: DocumentationCertificateInterface,
  ): DocumentationVaccinationCertificate {
    return new DocumentationRabiesSerologicalTest(
      new DocumentationIsApplied(rabiesSeroLogicalTest.isApplied),
      new DocumentationIsApplied(rabiesSeroLogicalTest.hasServiceIncluded),
      new DocumentationExpectedDate(rabiesSeroLogicalTest.expectedDate),
      new DocumentationExecutionDate(rabiesSeroLogicalTest.executionDate),
      new DocumentationResultDate(rabiesSeroLogicalTest.resultDate),
      new DocumentationIsRequired(rabiesSeroLogicalTest.isRequired),
      new DocumentationObservation(rabiesSeroLogicalTest.observation),
      new DocumentationIsPrint(rabiesSeroLogicalTest.isPrint),
      new UuidOptional(rabiesSeroLogicalTest?.user ?? ''),
    );
  }

  static importLicense(
    importLicense: DocumentationCertificateInterface,
  ): DocumentationVaccinationCertificate {
    return new DocumentationImportLicense(
      new DocumentationIsApplied(importLicense.isApplied),
      new DocumentationIsApplied(importLicense.hasServiceIncluded),
      new DocumentationExpectedDate(importLicense.expectedDate),
      new DocumentationExecutionDate(importLicense.executionDate),
      new DocumentationResultDate(importLicense.resultDate),
      new DocumentationIsRequired(importLicense.isRequired),
      new DocumentationObservation(importLicense.observation),
      new DocumentationIsPrint(importLicense.isPrint),
      new UuidOptional(importLicense?.user ?? ''),
    );
  }

  static emotionalSupportCertificate(
    emotionalSupportCertificate: DocumentationCertificateInterface,
  ): DocumentationVaccinationCertificate {
    return new DocumentationEmocionalSupportCertificate(
      new DocumentationIsApplied(emotionalSupportCertificate.isApplied),
      new DocumentationIsApplied(
        emotionalSupportCertificate.hasServiceIncluded,
      ),
      new DocumentationExpectedDate(emotionalSupportCertificate.expectedDate),
      new DocumentationExecutionDate(emotionalSupportCertificate.executionDate),
      new DocumentationResultDate(emotionalSupportCertificate.resultDate),
      new DocumentationIsRequired(emotionalSupportCertificate.isRequired),
      new DocumentationObservation(emotionalSupportCertificate.observation),
      new DocumentationIsPrint(emotionalSupportCertificate.isPrint),
      new UuidOptional(emotionalSupportCertificate?.user ?? ''),
    );
  }
}
