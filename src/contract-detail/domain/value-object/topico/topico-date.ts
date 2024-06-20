import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';

export class TopicoDate {
  constructor(readonly value: Date | null) {
    if (this.value) {
      this.ensureValueIsDate(this.value);
    }
  }

  private ensureValueIsDate(value: Date): void {

    if (!this.isValidDate(value)) {
      throw new ErrorInvalidadArgument(
        'La fecha de ejecución no es una fecha válida',
      );
    }
  }

  private isValidDate(value) {
    let date = new Date(value);
    return date instanceof Date && !isNaN(date.getTime());
  }
}
