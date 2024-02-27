import { Start } from '../../domain/criteria/start';
import { Size } from '../../domain/criteria/size';
import { Sorting } from '../../domain/criteria/sorting';
import { Filter } from '../../domain/criteria/filters';
import { SelectProperties } from '../../domain/criteria/select-properties';
import { FilterField } from '../../domain/criteria/filter-field';
import { FilterValue } from '../../domain/criteria/filter-value';
import { FilterOperator } from '../../domain/criteria/filter-operator';
import { OrderType } from '../../domain/criteria/order-type';
import { OrderBy } from '../../domain/criteria/order-by';
import { CriteriaRequest } from './criteria';
import { GlobalFilter } from '../../domain/criteria/global-filter';
import { GlobalFilterProperties } from '../../domain/criteria/global-filter-properties';
import { Criteria } from '../../domain/criteria/criteria';

export class CommandCriteria {
  static fromData(criteriaRequest: Partial<CriteriaRequest>): Criteria {
    const {
      start,
      size,
      filters,
      sorting,
      globalFilter,
      globalFilterProperties,
      selectProperties,
    } = this.converter(criteriaRequest);

    return new Criteria(
      start,
      size,
      filters,
      sorting,
      globalFilter,
      globalFilterProperties,
      selectProperties,
    );
  }

  private static converter(criteriaRequest: Partial<CriteriaRequest>) {
    const {
      filters = [],
      globalFilter = '',
      globalFilterProperties = [],
      selectProperties = [],
      sorting = [],
      size = 10,
      start = 0,
    } = criteriaRequest;

    return {
      start: new Start(start),
      size: new Size(size),
      filters: filters.map(
        (f) =>
          new Filter(
            new FilterField(f.field),
            new FilterOperator(f?.operator ?? 'CONTAINS'),
            new FilterValue(f.value),
          ),
      ),
      sorting: sorting.map(
        (s) => new Sorting(new OrderBy(s.orderBy), new OrderType(s.orderType)),
      ),
      globalFilter: new GlobalFilter(globalFilter),
      globalFilterProperties: globalFilterProperties.map(
        (g) =>
          new GlobalFilterProperties(
            new FilterField(g.field),
            new FilterValue(g.value),
          ),
      ),
      selectProperties: new SelectProperties(selectProperties),
    };
  }
}
