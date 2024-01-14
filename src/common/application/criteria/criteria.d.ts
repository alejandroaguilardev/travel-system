import { FilterRequest } from './filter';
import { GlobalFilterPropertiesRequest } from './global-filter-properties';
import { SortingRequest } from './sorting';

export interface CriteriaRequest {
  start: number;
  size: number;
  filters: FilterRequest[];
  sorting: SortingRequest[];
  globalFilter: string;
  globalFilterProperties: GlobalFilterPropertiesRequest[];
  selectProperties: string[];
}
