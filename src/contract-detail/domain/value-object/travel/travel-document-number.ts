import { StringValueObject } from '../../../../common/domain/value-object/string-value-object';
import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';

export class TravelDocumentNumber extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.isValidName();
  }

  private isValidName() {
    if (this.value.length > 45) {
      throw new ErrorInvalidadArgument(
        'El número de documento debe ser menor a 45 caracteres',
      );
    }
  }
}
