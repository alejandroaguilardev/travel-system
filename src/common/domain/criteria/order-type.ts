import { ErrorInvalidadArgument } from '../errors/error-invalid-argument';

export enum OrderValue {
  ASC = 'asc',
  DESC = 'desc',
}

export class OrderType {
  readonly value: OrderValue;
  constructor(operator: string) {
    const operatorConverter = operator as OrderValue;
    this.isContaining(operatorConverter);
    this.value = operatorConverter;
  }

  isContaining(operator: OrderValue): void {
    const array = [OrderValue.ASC, OrderValue.DESC];

    if (!array.includes(operator) && operator !== undefined) {
      throw new ErrorInvalidadArgument(
        'El operator de ordenamiento no es válido',
      );
    }
  }
}
