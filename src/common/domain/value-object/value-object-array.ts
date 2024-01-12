import { InvalidArgumentError } from './invalid-argument-error';

type Primitives = string | string | number | boolean | boolean | Date;

export abstract class ValueObjectArray<T extends Primitives> {
  readonly value: T[];

  constructor(value: T[]) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T[]): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError('Valor de Arreglo no definido');
    }
  }
}
