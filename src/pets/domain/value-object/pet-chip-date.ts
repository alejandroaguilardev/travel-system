import { ErrorInvalidadArgument } from '../../../common/domain/errors/error-invalid-argument';

export class PetChipDate {
  constructor(public value: Date | null) {
    if (this.value) {
      this.ensureValueIsDate(this.value);
    }
  }

  private ensureValueIsDate(value: Date): void {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new ErrorInvalidadArgument('Valor no es una fecha válida');
    }
  }
}
