import { StringValueObject } from '../../../common/domain/value-object/string-value-object';
import { ErrorInvalidadArgument } from '../../../common/domain/errors/error-invalid-argument';

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.minLength(value);
    this.maxLength(value);
  }

  private minLength(password: string): void {
    if (password && password.length < 6) {
      throw new ErrorInvalidadArgument(
        'El password debe ser mayor a 5 caracteres',
      );
    }
  }

  private maxLength(password: string): void {
    if (password.length > 128) {
      throw new ErrorInvalidadArgument(
        'El password debe ser menor a  129 caracteres',
      );
    }
  }

  static generatePassword(length = 8) {
    const alphanumericChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
      password += alphanumericChars.charAt(randomIndex);
    }
    return password;
  }
}
