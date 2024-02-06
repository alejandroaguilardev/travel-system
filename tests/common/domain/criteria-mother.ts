import { faker } from '@faker-js/faker';
import { CriteriaRequest } from '../../../src/common/application/criteria/criteria';

export class CriteriaMother {
  static create(criteriaDefault?: Partial<CriteriaRequest>): CriteriaRequest {
    return {
      start: criteriaDefault?.start ?? faker.number.int(),
      size: criteriaDefault?.size ?? faker.number.int(),
      filters: criteriaDefault?.filters ?? [],
      sorting: criteriaDefault?.sorting ?? [],
      globalFilter: criteriaDefault?.globalFilter ?? '',
      globalFilterProperties: criteriaDefault?.globalFilterProperties ?? [],
      selectProperties: criteriaDefault?.selectProperties ?? [],
    };
  }
}
