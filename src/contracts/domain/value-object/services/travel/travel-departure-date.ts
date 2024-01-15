import { ErrorInvalidadArgument } from '../../../../../common/domain/errors/error-invalid-argument';

export class TravelDepartureDate {
  constructor(readonly value: Date | null = null) {}

  ensureValueIsDate(value: Date): void {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new ErrorInvalidadArgument('Valor no es una fecha válida');
    }
  }
}
