import { StringValueObject } from '../../common/domain/value-object/string-value-object';
import { ErrorInvalidadArgument } from '../../common/domain/errors/error-invalid-argument';

export class PermissionDescription extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.isValid();
  }

  private isValid() {
    if (this.value.length > 255) {
      throw new ErrorInvalidadArgument(
        'La descripción debe ser menor a 255 caracteres',
      );
    }
  }
}
