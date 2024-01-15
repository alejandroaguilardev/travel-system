import { DocumentationIsApplied } from './documentation-is-applied';

export class DocumentationVaccinationCertificate {
  constructor(readonly isApplied: DocumentationIsApplied) {}

  toJson() {
    return {
      isApplied: this.isApplied.value,
    };
  }
}
