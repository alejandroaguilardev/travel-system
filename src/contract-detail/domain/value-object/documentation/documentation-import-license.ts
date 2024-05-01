import { UuidOptional } from '../../../../common/domain/value-object';
import { ContractHasServiceIncluded } from '../contract-has-service.included';
import { DocumentationExecutionDate } from './documentation-execution-date';
import { DocumentationExpectedDate } from './documentation-expected-date';
import { DocumentationIsApplied } from './documentation-is-applied';
import { DocumentationIsPrint } from './documentation-is-print';
import { DocumentationIsRequired } from './documentation-is-required';
import { DocumentationObservation } from './documentation-observation';
import { DocumentationResultDate } from './documentation-result-date';

export class DocumentationImportLicense {
  constructor(
    readonly isApplied: DocumentationIsApplied,
    readonly hasServiceIncluded: ContractHasServiceIncluded,
    readonly expectedDate: DocumentationExpectedDate,
    readonly executionDate: DocumentationExecutionDate,
    readonly resultDate: DocumentationResultDate,
    readonly isRequired: DocumentationIsRequired,
    readonly observation: DocumentationObservation,
    readonly isPrint: DocumentationIsPrint,
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
      observation: this.observation.value,
      isPrint: this.isPrint.value,
      user: this.user.value,
    };
  }
}
