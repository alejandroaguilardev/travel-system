import { EmailValueObject } from '../../common/domain/value-object/email-value-object';
import { ErrorInvalidadArgument } from '../../common/domain/errors/error-invalid-argument';

export class UserEmail extends EmailValueObject {
  constructor(value: string) {
    super(value?.toLocaleLowerCase());
    if (!value.trim()) {
      this.isNotEmpty();
    }
  }

  private isNotEmpty() {
    throw new ErrorInvalidadArgument(
      'El email del usuario no puede ser una cadena vacía',
    );
  }
}
