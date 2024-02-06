import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';

export class UserGender {
  private values = ['female', 'male'];
  constructor(readonly value: string) {
    this.validSecured(value);
  }

  private validSecured(value: string): void {
    if (!this.values.includes(value)) {
      throw new ErrorInvalidadArgument('No es un tipo de sexo válido');
    }
  }
}
