import { OrderBy } from './order-by';
import { OrderType } from './order-type';

export class Sorting {
  constructor(
    readonly orderBy: OrderBy,
    readonly orderType: OrderType,
  ) {}
}
