import { ContractStatus } from '../value-object/contract-status';
import { ContractDocumentation } from '../value-object/services/service-documentation';
import { DocumentationVaccinationCertificate } from '../value-object/services/documentation/documentation-vaccination-certificate';
import { DocumentationIsApplied } from '../value-object/services/documentation/documentation-is-applied';
import { DocumentationHealthCertificate } from '../value-object/services/documentation/documentation-health-certificate';
import { DocumentationChipCertificate } from '../value-object/services/documentation/documentation-chip-certificate';
import { DocumentationSenasaDocuments } from '../value-object/services/documentation/documentation-senasa-documents';
import { DocumentationRabiesSerologicalTest } from '../value-object/services/documentation/documentation-rabies-serological-test';
import { DocumentationImportLicense } from '../value-object/services/documentation/documentation-import-license';
import { DocumentationEmocionalSupportCertificate } from '../value-object/services/documentation/documentation-emotional-support-certificate';
import { DocumentationDefinition } from '../interfaces/documentation';

export class ContractDocumentationFactory {
  static create(documentation: DocumentationDefinition): ContractDocumentation {
    return new ContractDocumentation(
      new ContractStatus(
        documentation.status === 'none' ? 'pending' : documentation.status,
      ),
      new DocumentationVaccinationCertificate(
        new DocumentationIsApplied(
          documentation.vaccinationCertificate.isApplied,
        ),
        new DocumentationIsApplied(
          documentation.vaccinationCertificate.hasServiceIncluded,
        ),
      ),
      new DocumentationHealthCertificate(
        new DocumentationIsApplied(documentation.healthCertificate.isApplied),
        new DocumentationIsApplied(
          documentation.healthCertificate.hasServiceIncluded,
        ),
      ),
      new DocumentationChipCertificate(
        new DocumentationIsApplied(documentation.chipCertificate.isApplied),
        new DocumentationIsApplied(
          documentation.chipCertificate.hasServiceIncluded,
        ),
      ),
      new DocumentationSenasaDocuments(
        new DocumentationIsApplied(documentation.senasaDocuments.isApplied),
        new DocumentationIsApplied(
          documentation.senasaDocuments.hasServiceIncluded,
        ),
      ),
      new DocumentationRabiesSerologicalTest(
        new DocumentationIsApplied(
          documentation.rabiesSeroLogicalTest.isApplied,
        ),
        new DocumentationIsApplied(
          documentation.rabiesSeroLogicalTest.hasServiceIncluded,
        ),
      ),
      new DocumentationImportLicense(
        new DocumentationIsApplied(documentation.importLicense.isApplied),
        new DocumentationIsApplied(
          documentation.importLicense.hasServiceIncluded,
        ),
      ),
      new DocumentationEmocionalSupportCertificate(
        new DocumentationIsApplied(
          documentation.emotionalSupportCertificate.isApplied,
        ),
        new DocumentationIsApplied(
          documentation.emotionalSupportCertificate.hasServiceIncluded,
        ),
      ),
    );
  }
}
