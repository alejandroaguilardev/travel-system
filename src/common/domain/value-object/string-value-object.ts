import { ErrorInvalidadArgument } from '../errors';
import { ValueObject } from './value-object';

export abstract class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value.trim());
    this.isValid();
  }

  private isValid() {
    if (this.value.length > 255) {
      throw new ErrorInvalidadArgument(
        'La recomendación debe ser menor a 255 caracteres',
      );
    }
  }
}
