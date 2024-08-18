import { FilterQuery, isValidObjectId } from 'mongoose';
import { Criteria } from '../../domain/criteria/criteria';
import { Sorting } from '../../domain/criteria/sorting';
import { OrderValue } from '../../domain/criteria/order-type';
import { GlobalFilter } from '../../domain/criteria/global-filter';
import { GlobalFilterProperties } from '../../domain/criteria/global-filter-properties';
import { Filter } from '../../domain/criteria/filters';

export class MongoCriteriaConverter {
  static converter<T>(criteria: Criteria) {
    const {
      start,
      size,
      filters,
      sorting,
      globalFilter,
      globalFilterProperties,
      selectProperties,
    } = criteria;

    const queryGlobalFilter = this.queryGlobalFilter(
      globalFilter,
      globalFilterProperties,
    );

    const sortQuery = this.querySort(sorting);

    let query: FilterQuery<T> = {};
    query = this.queryFilters(query, filters);

    if (queryGlobalFilter) {
      query.$or = queryGlobalFilter;
    }

    return {
      start: start.value * size.value,
      size: size.value,
      query,
      sortQuery,
      selectProperties: selectProperties.value,
    };
  }

  private static queryGlobalFilter(
    globalFilter: GlobalFilter,
    globalFilterProperties: GlobalFilterProperties[],
  ) {
    if (!globalFilter.value) {
      return null;
    }

    const queryGlobal = [];
    for (const column of globalFilterProperties) {
      if (column.value.getValue() === 'string') {
        queryGlobal.push({
          [column.field.value]: { $regex: globalFilter.value, $options: 'i' },
        });
      } else if (column.value.getValue() === 'number') {
        if (!isNaN(parseFloat(globalFilter.value)))
          queryGlobal.push({ [column.field.value]: globalFilter.value });
      } else {
        queryGlobal.push({ [column.field.value]: globalFilter.value });
      }
    }
    return queryGlobal;
  }

  private static queryFilters<T>(query: FilterQuery<T>, filters: Filter[]) {
    for (const filter of filters) {
      const field = filter.field.value as string;
      const filterValue = filter.value.getValue();

      if (isValidObjectId(filterValue)) {
        query[field as keyof FilterQuery<T>] = filterValue;
      } else if (filterValue === '{{no_empty}}') {
        query[field as keyof FilterQuery<T>] = { $ne: '' };
      } else if (typeof filterValue === 'string') {
        const filterValueRegex = filterValue
          ? new RegExp(filterValue as string, 'i')
          : filterValue;
        query[field as keyof FilterQuery<T>] = filterValueRegex;
      } else if (filterValue && Array.isArray(filterValue)) {
        const array: any = filterValue;
        if (array.length === 2 && !array[0] && !array[1]) {
          continue;
        }
        query[field as keyof FilterQuery<T>] = { $in: array };
      } else {
        query[field as keyof FilterQuery<T>] = filterValue;
      }
    }
    return query;
  }

  private static querySort(sorting: Sorting[]): Record<string, 1 | -1> {
    const sortQuery: Record<string, 1 | -1> = {};
    for (const sort of sorting) {
      sortQuery[sort.orderBy.value] =
        sort.orderType.value === OrderValue.DESC ? -1 : 1;
    }

    if (sorting.length === 0) {
      sortQuery["createdAt"] = -1;
    }
    return sortQuery;
  }
}
