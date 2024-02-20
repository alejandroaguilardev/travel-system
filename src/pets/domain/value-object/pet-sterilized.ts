import { StringValueObject } from '../../../common/domain/value-object/string-value-object';
import { ErrorInvalidadArgument } from '../../../common/domain/errors/error-invalid-argument';

export class PetSterilized extends StringValueObject {
  private values = ['si', 'no'];

  constructor(value: string) {
    super(value);
    this.isValidSterilized();
  }

  private isValidSterilized() {
    if (!this.values.includes(this.value.toLowerCase())) {
      throw new ErrorInvalidadArgument('La esterilización debe ser si o no');
    }
  }
}
