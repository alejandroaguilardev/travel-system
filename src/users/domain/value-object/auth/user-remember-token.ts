import { StringValueObject } from '../../../../common/domain/value-object/string-value-object';

export class UserAuthRemember extends StringValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
