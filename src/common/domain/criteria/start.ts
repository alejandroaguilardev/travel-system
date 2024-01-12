import { InvalidArgumentError } from '../value-object/invalid-argument-error';
import { NumberValueObject } from '../value-object/number-value-object';

export class Start extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  isValidStart(): void {
    if (!this.isPositive()) {
      throw new InvalidArgumentError(
        'El criterio de búsqueda no puede ser un número negativo',
      );
    }
  }

  isPositive(): boolean {
    return this.value >= 0;
  }
}
