import { ErrorInvalidadArgument } from '../errors/error-invalid-argument';
import { StringValueObject } from './string-value-object';

export class EmailValueObject extends StringValueObject {
  private emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(value: string) {
    const email = value?.trim()?.toLowerCase();
    super(email);
    if (email) {
      this.ensureEmailIsDefined(email);
    }
  }

  private ensureEmailIsDefined(email: string): void {
    if (!this.emailRegex.test(email)) {
      throw new ErrorInvalidadArgument('No es un email válido de dominio');
    }
  }
}
