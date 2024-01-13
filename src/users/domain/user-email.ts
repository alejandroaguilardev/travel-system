import { StringValueObject } from '../../common/domain/value-object/string-value-object';
import { ErrorInvalidadArgument } from '../../common/domain/errors/error-invalid-argument';

export class UserEmail extends StringValueObject {
  private emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(value: string) {
    super(value);
    this.ensureEmailIsDefined(value);
  }

  private ensureEmailIsDefined(email: string): void {
    if (!this.emailRegex.test(email)) {
      throw new ErrorInvalidadArgument(
        'No es un email de usuario válido de dominio',
      );
    }
  }
}
