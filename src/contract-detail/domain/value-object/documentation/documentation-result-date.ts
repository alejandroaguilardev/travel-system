import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';

export class DocumentationResultDate {
  constructor(readonly value: Date | null) {
    if (this.value) {
      this.ensureValueIsDate(this.value);
    }
  }

  private ensureValueIsDate(value: Date): void {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new ErrorInvalidadArgument(
        'La fecha de ejecución no es una fecha válida',
      );
    }
  }
}
