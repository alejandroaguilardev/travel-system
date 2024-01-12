import { Filter } from './filters';
import { GlobalFilter } from './global-filter';
import { GlobalFilterProperties } from './global-filter-properties';
import { SelectProperties } from './select-properties';
import { Size } from './size';
import { Sorting } from './sorting';
import { Start } from './start';

export class Criteria {
  constructor(
    readonly start: Start,
    readonly size: Size,
    readonly filters: Filter[],
    readonly sorting: Sorting[],
    readonly globalFilter: GlobalFilter,
    readonly globalFilterProperties: GlobalFilterProperties[],
    readonly selectProperties: SelectProperties,
  ) {}
}
