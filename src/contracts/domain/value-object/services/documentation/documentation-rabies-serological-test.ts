import { DocumentationIsApplied } from './documentation-is-applied';

export class DocumentationRabiesSerologicalTest {
  constructor(readonly isApplied: DocumentationIsApplied) {}

  toJson() {
    return {
      isApplied: this.isApplied.value,
    };
  }
}
