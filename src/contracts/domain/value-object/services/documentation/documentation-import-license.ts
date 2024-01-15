import { DocumentationIsApplied } from './documentation-is-applied';

export class DocumentationImportLicense {
  constructor(readonly isApplied: DocumentationIsApplied) {}

  toJson() {
    return {
      isApplied: this.isApplied.value,
    };
  }
}
