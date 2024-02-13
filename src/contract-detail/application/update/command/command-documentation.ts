import {
  ContractStatus,
  UuidOptional,
} from '../../../../common/domain/value-object';
import { DocumentationInterface } from '../../../domain/interfaces';
import { ContractDocumentation } from '../../../domain/value-object';
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
        new UuidOptional(documentation.vaccinationCertificate?.user ?? ''),
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
        new UuidOptional(documentation.vaccinationCertificate?.user ?? ''),
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
        new UuidOptional(documentation.vaccinationCertificate?.user ?? ''),
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
        new UuidOptional(documentation.vaccinationCertificate?.user ?? ''),
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
        new UuidOptional(documentation.vaccinationCertificate?.user ?? ''),
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
        new UuidOptional(documentation.vaccinationCertificate?.user ?? ''),
      ),
    );
  }
}
