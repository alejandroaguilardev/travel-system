import { StringValueObject } from '../../common/domain/value-object/string-value-object';
import { InvalidArgumentError } from '../../common/domain/value-object/invalid-argument-error';

export class UserFirstName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.isValidName();
  }

  private isValidName() {
    if (this.value.length === 0) {
      throw new InvalidArgumentError('El nombre debe contener algún carácter');
    }

    if (this.value.length > 45) {
      throw new InvalidArgumentError(
        'El nombre debe ser menor a 20 caracteres',
      );
    }
  }
}
