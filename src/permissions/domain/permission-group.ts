import { StringValueObject } from '../../common/domain/value-object/string-value-object';
import { ErrorInvalidadArgument } from '../../common/domain/errors/error-invalid-argument';

export class PermissionGroup extends StringValueObject {
  constructor(value: string) {
    super(value.toLowerCase());
    this.isValidName();
  }

  private isValidName() {
    if (this.value.length === 0) {
      throw new ErrorInvalidadArgument(
        'El nombre debe contener algún carácter',
      );
    }

    if (this.value.length > 30) {
      throw new ErrorInvalidadArgument(
        'El nombre debe ser menor a 30 caracteres',
      );
    }
  }
}
