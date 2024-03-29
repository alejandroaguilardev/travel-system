import {
  ContractStatus,
  UuidOptional,
} from '../../../../common/domain/value-object';
import { DocumentationInterface } from '../../../domain/interfaces';
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
} from '../../../domain/value-object/documentation';

export class CommandContractDocumentation {
  static execute(documentation: DocumentationInterface): ContractDocumentation {
    return new ContractDocumentation(
      new ContractStatus(
        documentation?.status === 'none' ? 'pending' : documentation.status,
      ),
      new DocumentationVaccinationCertificate(
        new DocumentationIsApplied(
          documentation.vaccinationCertificate.isApplied,
        ),
        new DocumentationIsApplied(
          documentation.vaccinationCertificate.hasServiceIncluded,
        ),
        new DocumentationExpectedDate(
          documentation.vaccinationCertificate.expectedDate,
        ),
        new DocumentationExecutionDate(
          documentation.vaccinationCertificate.executionDate,
        ),
        new DocumentationResultDate(
          documentation.vaccinationCertificate.resultDate,
        ),
        new UuidOptional(documentation.vaccinationCertificate?.user ?? ''),
      ),
      new DocumentationHealthCertificate(
        new DocumentationIsApplied(documentation.healthCertificate.isApplied),
        new DocumentationIsApplied(
          documentation.healthCertificate.hasServiceIncluded,
        ),
        new DocumentationExpectedDate(
          documentation.healthCertificate.expectedDate,
        ),
        new DocumentationExecutionDate(
          documentation.healthCertificate.executionDate,
        ),
        new DocumentationResultDate(documentation.healthCertificate.resultDate),
        new UuidOptional(documentation.healthCertificate?.user ?? ''),
      ),
      new DocumentationChipCertificate(
        new DocumentationIsApplied(documentation.chipCertificate.isApplied),
        new DocumentationIsApplied(
          documentation.chipCertificate.hasServiceIncluded,
        ),
        new DocumentationExpectedDate(
          documentation.chipCertificate.expectedDate,
        ),
        new DocumentationExecutionDate(
          documentation.chipCertificate.executionDate,
        ),
        new DocumentationResultDate(documentation.chipCertificate.resultDate),
        new UuidOptional(documentation.chipCertificate?.user ?? ''),
      ),
      new DocumentationSenasaDocuments(
        new DocumentationIsApplied(documentation.senasaDocuments.isApplied),
        new DocumentationIsApplied(
          documentation.senasaDocuments.hasServiceIncluded,
        ),
        new DocumentationExpectedDate(
          documentation.senasaDocuments.expectedDate,
        ),
        new DocumentationExecutionDate(
          documentation.senasaDocuments.executionDate,
        ),
        new DocumentationResultDate(documentation.senasaDocuments.resultDate),
        new UuidOptional(documentation.senasaDocuments?.user ?? ''),
      ),
      new DocumentationRabiesSerologicalTest(
        new DocumentationIsApplied(
          documentation.rabiesSeroLogicalTest.isApplied,
        ),
        new DocumentationIsApplied(
          documentation.rabiesSeroLogicalTest.hasServiceIncluded,
        ),
        new DocumentationExpectedDate(
          documentation.rabiesSeroLogicalTest.expectedDate,
        ),
        new DocumentationExecutionDate(
          documentation.rabiesSeroLogicalTest.executionDate,
        ),
        new DocumentationResultDate(
          documentation.rabiesSeroLogicalTest.resultDate,
        ),
        new UuidOptional(documentation.rabiesSeroLogicalTest?.user ?? ''),
      ),
      new DocumentationImportLicense(
        new DocumentationIsApplied(documentation.importLicense.isApplied),
        new DocumentationIsApplied(
          documentation.importLicense.hasServiceIncluded,
        ),
        new DocumentationExpectedDate(documentation.importLicense.expectedDate),
        new DocumentationExecutionDate(
          documentation.importLicense.executionDate,
        ),
        new DocumentationResultDate(documentation.importLicense.resultDate),
        new UuidOptional(documentation.importLicense?.user ?? ''),
      ),
      new DocumentationEmocionalSupportCertificate(
        new DocumentationIsApplied(
          documentation.emotionalSupportCertificate.isApplied,
        ),
        new DocumentationIsApplied(
          documentation.emotionalSupportCertificate.hasServiceIncluded,
        ),
        new DocumentationExpectedDate(
          documentation.emotionalSupportCertificate.expectedDate,
        ),
        new DocumentationExecutionDate(
          documentation.emotionalSupportCertificate.executionDate,
        ),
        new DocumentationResultDate(
          documentation.emotionalSupportCertificate.resultDate,
        ),
        new UuidOptional(documentation.emotionalSupportCertificate?.user ?? ''),
      ),
    );
  }
}
