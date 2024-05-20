import { Uuid } from '../../common/domain/value-object/uuid';
import { ErrorBody } from './Incident-body';
import { ErrorCatch } from './Incident-catch';
import { ErrorName } from './incident-name';
import { DateValueObject } from '../../common/domain/value-object/date-value-object';

export class Incident {
  constructor(
    readonly id: Uuid,
    readonly name: ErrorName,
    readonly body: ErrorBody,
    readonly error: ErrorCatch,
    readonly date_error: DateValueObject,
  ) {}

  toJson() {
    return {
      id: this.id.value,
      name: this.name.value,
      body: this.body.value,
      error: this.error.value,
      date_error: this.date_error.value,
    };
  }
}
