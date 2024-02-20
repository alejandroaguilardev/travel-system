import { ErrorInvalidadArgument } from '../../common/domain/errors/error-invalid-argument';
import { ValueObject } from '../../common/domain/value-object/value-object';

export class RoleName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.isValid();
  }

  private isValid() {
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
