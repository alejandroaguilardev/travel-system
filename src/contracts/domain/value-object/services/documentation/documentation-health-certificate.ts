import { DocumentationIsApplied } from './documentation-is-applied';

export class DocumentationHealthCertificate {
  constructor(readonly isApplied: DocumentationIsApplied) {}

  toJson() {
    return {
      isApplied: this.isApplied.value,
    };
  }
}
