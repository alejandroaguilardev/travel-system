import { ErrorInvalidadArgument } from '../../../common/domain/errors';
import { NumberValueObject } from '../../../common/domain/value-object';

export class ContractPrice extends NumberValueObject {
  constructor(value: number) {
    super(value);
    this.validPrice(value);
  }

  private validPrice(value: number) {
    if (value < 0) {
      throw new ErrorInvalidadArgument(
        'El precio del contrato no puede ser negativo',
      );
    }
  }
}
