import { DocumentationIsApplied } from './documentation-is-applied';

export class DocumentationSenasaDocuments {
  constructor(readonly isApplied: DocumentationIsApplied) {}

  toJson() {
    return {
      isApplied: this.isApplied.value,
    };
  }
}
