import { CreateRequestIncident } from './create-request-incidennt';
import { Incident } from '../../domain/incidents';
import { ErrorName } from '../../domain/incident-name';
import { ErrorCatch } from '../../domain/Incident-catch';
import { ErrorBody } from '../../domain/Incident-body';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { DateValueObject } from '../../../common/domain/value-object/date-value-object';

export class CommandCreateIncident {
  static execute(data: CreateRequestIncident): Incident {
    return new Incident(
      new Uuid(data.id),
      new ErrorName(data.name),
      new ErrorBody(data.body),
      new ErrorCatch(data.error),
      new DateValueObject(new Date()),
    );
  }
}
