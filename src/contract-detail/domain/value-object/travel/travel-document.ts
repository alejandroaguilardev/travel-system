import { StringValueObject } from '../../../../common/domain/value-object/string-value-object';
import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';

export class TravelDocument extends StringValueObject {
  static types = ['D.N.I.', 'PASAPORTE', 'C.E.'];

  constructor(value: string) {
    super(value);
    if (value) {
      this.ensureValueDocument(value);
    }
  }

  private ensureValueDocument(document: string) {
    if (!TravelDocument.types.includes(document)) {
      throw new ErrorInvalidadArgument('No es un documento válido');
    }
  }
}
