import { UuidOptional } from '../../../../../common/domain/value-object';
import { ContractHasServiceIncluded } from '../../contract-has-service.included';
import { DocumentationExecutionDate } from './documentation-execution-date';
import { DocumentationExpectedDate } from './documentation-expected-date';
import { DocumentationIsApplied } from './documentation-is-applied';

export class DocumentationEmocionalSupportCertificate {
  constructor(
    readonly isApplied: DocumentationIsApplied,
    readonly hasServiceIncluded: ContractHasServiceIncluded,
    readonly expectedDate: DocumentationExpectedDate,
    readonly executionDate: DocumentationExecutionDate,
    readonly user: UuidOptional,
  ) {}

  toJson() {
    return {
      isApplied: this.isApplied.value,
      hasServiceIncluded: this.hasServiceIncluded.value,
      expectedDate: this.expectedDate.value,
      executionDate: this.executionDate.value,
      user: this.user.value,
    };
  }
}
