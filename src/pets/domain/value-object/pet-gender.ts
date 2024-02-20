import { ErrorInvalidadArgument } from '../../../common/domain/errors/error-invalid-argument';

export type PetGenderType = 'male' | 'female';

export class PetGender {
  private values = ['female', 'male'];
  constructor(readonly value: PetGenderType) {
    this.validSecured(value);
  }

  private validSecured(value: string): void {
    if (!this.values.includes(value)) {
      throw new ErrorInvalidadArgument('No es un tipo de sexo válido');
    }
  }
}
