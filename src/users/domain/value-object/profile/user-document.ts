import { StringValueObject } from '../../../../common/domain/value-object/string-value-object';
import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';

export class UserDocument extends StringValueObject {
  static types = ['D.N.I.', 'PASAPORTE', 'C.E.', 'R.U.C.'];

  constructor(value: string) {
    super(value);
    this.ensureValueDocument(value);
  }

  private ensureValueDocument(document: string) {
    if (!UserDocument.types.includes(document)) {
      throw new ErrorInvalidadArgument('no es un documento válido');
    }
  }
}
