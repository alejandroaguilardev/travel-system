import { StringValueObject } from '../../common/domain/value-object/string-value-object';
import { InvalidArgumentError } from '../../common/domain/value-object/invalid-argument-error';

export class PermissionDescription extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.isValid();
  }

  private isValid() {
    if (this.value.length > 255) {
      throw new InvalidArgumentError(
        'La descripción debe ser menor a 255 caracteres',
      );
    }
  }
}
