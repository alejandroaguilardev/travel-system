import { StringValueObject } from '../../common/domain/value-object/string-value-object';
import { InvalidArgumentError } from '../../common/domain/value-object/invalid-argument-error';

export class UserEmail extends StringValueObject {
  private emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(value: string) {
    super(value);
    this.ensureEmailIsDefined(value);
  }

  private ensureEmailIsDefined(email: string): void {
    if (!this.emailRegex.test(email)) {
      throw new InvalidArgumentError(
        'No es un email de usuario válido de dominio',
        400,
      );
    }
  }
}
