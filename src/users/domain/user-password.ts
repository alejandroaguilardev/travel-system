import { StringValueObject } from '../../common/domain/value-object/string-value-object';
import { InvalidArgumentError } from '../../common/domain/value-object/invalid-argument-error';

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.minLength(value);
    this.maxLength(value);
  }

  private minLength(password: string): void {
    if (password.length < 6) {
      throw new InvalidArgumentError(
        'El password debe ser mayor a 5 caracteres',
      );
    }
  }

  private maxLength(password: string): void {
    if (password.length > 128) {
      throw new InvalidArgumentError(
        'El password debe ser menor a  129 caracteres',
      );
    }
  }
}
