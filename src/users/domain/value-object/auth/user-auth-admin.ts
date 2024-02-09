import { ValueObject } from '../../../../common/domain/value-object/value-object';

export class UserAuthAdmin extends ValueObject<boolean> {
  constructor(readonly value: boolean) {
    super(value);
  }
}
