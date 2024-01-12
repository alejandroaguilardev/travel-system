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

export class CriteriaFactory {
  static fromData(criteriaRequest: CriteriaRequest): Criteria {
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

  private static converter(criteriaRequest: CriteriaRequest) {
    return {
      start: new Start(criteriaRequest.start),
      size: new Size(criteriaRequest.size),
      filters: criteriaRequest.filters.map(
        (f) =>
          new Filter(
            new FilterField(f.field),
            new FilterOperator(f.operator),
            new FilterValue(f.value),
          ),
      ),
      sorting: criteriaRequest.sorting.map(
        (s) => new Sorting(new OrderBy(s.orderBy), new OrderType(s.orderType)),
      ),
      globalFilter: new GlobalFilter(criteriaRequest.globalFilter),
      globalFilterProperties: criteriaRequest.globalFilterProperties.map(
        (g) =>
          new GlobalFilterProperties(
            new FilterField(g.field),
            new FilterValue(g.value),
          ),
      ),
      selectProperties: new SelectProperties(criteriaRequest.selectProperties),
    };
  }
}
