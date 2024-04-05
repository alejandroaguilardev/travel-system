import { UuidOptional } from '../../../../common/domain/value-object';
import { ContractHasServiceIncluded } from '../contract-has-service.included';
import { DocumentationExecutionDate } from './documentation-execution-date';
import { DocumentationExpectedDate } from './documentation-expected-date';
import { DocumentationIsApplied } from './documentation-is-applied';
import { DocumentationIsRequired } from './documentation-is-required';
import { DocumentationResultDate } from './documentation-result-date';

export class DocumentationVaccinationCertificate {
  constructor(
    readonly isApplied: DocumentationIsApplied,
    readonly hasServiceIncluded: ContractHasServiceIncluded,
    readonly expectedDate: DocumentationExpectedDate,
    readonly executionDate: DocumentationExecutionDate,
    readonly resultDate: DocumentationResultDate,
    readonly isRequired: DocumentationIsRequired,
    readonly user: UuidOptional,
  ) {}

  toJson() {
    return {
      isApplied: this.isApplied.value,
      hasServiceIncluded: this.hasServiceIncluded.value,
      expectedDate: this.expectedDate.value,
      executionDate: this.executionDate.value,
      resultDate: this.resultDate.value,
      isRequired: this.isRequired.value,
      user: this.user.value,
    };
  }
}
