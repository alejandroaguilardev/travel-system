import { FilterField } from './filter-field';
import { FilterOperator } from './filter-operator';
import { FilterValue } from './filter-value';

export class Filter {
  constructor(
    readonly field: FilterField,
    readonly operator: FilterOperator,
    readonly value: FilterValue,
  ) {}
}
