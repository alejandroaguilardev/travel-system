import { InvalidArgumentError } from '../value-object/invalid-argument-error';
import { StringValueObject } from '../value-object/string-value-object';

export class FilterOperator extends StringValueObject {
  public static EQUAL: string = '=';
  public static NOT_EQUAL: string = '!=';
  public static GT: string = '>';
  public static LT: string = '<';
  public static CONTAINS: string = 'CONTAINS';
  public static NOT_CONTAINS: string = 'NOT_CONTAINS';

  constructor(value: string) {
    super(value);
    this.isContaining(value);
  }

  isContaining(operator: string): void {
    const array = [
      FilterOperator.EQUAL,
      FilterOperator.NOT_EQUAL,
      FilterOperator.GT,
      FilterOperator.LT,
      FilterOperator.CONTAINS,
      FilterOperator.NOT_CONTAINS,
    ];
    if (!array.includes(operator)) {
      throw new InvalidArgumentError(operator);
    }
  }
}
