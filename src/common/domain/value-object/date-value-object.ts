import { ValueObject } from './value-object';
import { ErrorInvalidadArgument } from '../errors/error-invalid-argument';

export class DateValueObject extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
    this.ensureValueIsDate(value);
  }

  private ensureValueIsDate(value: Date): void {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new ErrorInvalidadArgument('Valor no es una fecha válida');
    }
  }
}
