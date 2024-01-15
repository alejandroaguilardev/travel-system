import { ErrorInvalidadArgument } from '../errors/error-invalid-argument';
import { StringValueObject } from './string-value-object';

export class PhoneValueObject extends StringValueObject {
  private phoneRegex: RegExp = /^\d{10}$/;

  constructor(value: string) {
    super(value);
    if (value.trim()) {
      this.ensurePhoneIsValid(value);
    }
  }

  private ensurePhoneIsValid(phone: string): void {
    if (!this.phoneRegex.test(phone)) {
      throw new ErrorInvalidadArgument('No es un número de teléfono válido');
    }
  }
}
