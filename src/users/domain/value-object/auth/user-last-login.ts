import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';

export class UserLastLogin {
  constructor(readonly value: Date | null) {
    if (value) {
      this.enSecure(value);
    }
  }

  private enSecure(value: Date) {
    if (!value) {
      throw new ErrorInvalidadArgument('No es una fecha válida');
    }
  }
}
