import { ContractHasServiceIncluded } from '../../contract-has-service.included';
import { DocumentationIsApplied } from './documentation-is-applied';

export class DocumentationHealthCertificate {
  constructor(
    readonly isApplied: DocumentationIsApplied,
    readonly hasServiceIncluded: ContractHasServiceIncluded,
  ) {}

  toJson() {
    return {
      isApplied: this.isApplied.value,
      hasServiceIncluded: this.hasServiceIncluded.value,
    };
  }
}
