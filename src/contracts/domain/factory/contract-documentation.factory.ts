import { ContractStatus } from '../value-object/contract-status';
import { ContractDocumentation } from '../value-object/services/service-documentation';
import { ContractHasServiceIncluded } from '../value-object/contract-has-service.included';
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
  static create(hasServiceIncluded: boolean): ContractDocumentation {
    const documentationIsApplied = new DocumentationIsApplied(false);
    return new ContractDocumentation(
      new ContractStatus(ContractStatus.status.pending),
      new ContractHasServiceIncluded(hasServiceIncluded),
      new DocumentationVaccinationCertificate(documentationIsApplied),
      new DocumentationHealthCertificate(documentationIsApplied),
      new DocumentationChipCertificate(documentationIsApplied),
      new DocumentationSenasaDocuments(documentationIsApplied),
      new DocumentationRabiesSerologicalTest(documentationIsApplied),
      new DocumentationImportLicense(documentationIsApplied),
      new DocumentationEmocionalSupportCertificate(documentationIsApplied),
    );
  }

  static converter(data: DocumentationDefinition): ContractDocumentation {
    return new ContractDocumentation(
      new ContractStatus(data.status),
      new ContractHasServiceIncluded(data.hasServiceIncluded),
      new DocumentationVaccinationCertificate(
        new DocumentationIsApplied(data.vaccinationCertificate.isApplied),
      ),
      new DocumentationHealthCertificate(
        new DocumentationIsApplied(data.healthCertificate.isApplied),
      ),
      new DocumentationChipCertificate(
        new DocumentationIsApplied(data.chipCertificate.isApplied),
      ),
      new DocumentationSenasaDocuments(
        new DocumentationIsApplied(data.senasaDocuments.isApplied),
      ),
      new DocumentationRabiesSerologicalTest(
        new DocumentationIsApplied(data.rabiesSeroLogicalTest.isApplied),
      ),
      new DocumentationImportLicense(
        new DocumentationIsApplied(data.importLicense.isApplied),
      ),
      new DocumentationEmocionalSupportCertificate(
        new DocumentationIsApplied(data.emotionalSupportCertificate.isApplied),
      ),
    );
  }
}
