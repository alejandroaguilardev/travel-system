import { ErrorInvalidadArgument } from '../errors/error-invalid-argument';
import { NumberValueObject } from '../value-object/number-value-object';

export class Start extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  isValidStart(): void {
    if (!this.isPositive()) {
      throw new ErrorInvalidadArgument(
        'El criterio de búsqueda no puede ser un número negativo',
      );
    }
  }

  isPositive(): boolean {
    return this.value >= 0;
  }
}
