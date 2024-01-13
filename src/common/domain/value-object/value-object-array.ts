import { ErrorInvalidadArgument } from '../errors/error-invalid-argument';

type Primitives = string | string | number | boolean | boolean | Date;

export abstract class ValueObjectArray<T extends Primitives> {
  readonly value: T[];

  constructor(value: T[]) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T[]): void {
    if (value === null || value === undefined) {
      throw new ErrorInvalidadArgument('Valor de Arreglo no definido');
    }
  }
}
