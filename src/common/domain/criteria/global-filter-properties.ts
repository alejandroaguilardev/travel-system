import { FilterField } from './filter-field';
import { FilterValue } from './filter-value';

export class GlobalFilterProperties {
  constructor(
    readonly field: FilterField,
    readonly value: FilterValue,
  ) {}
}
