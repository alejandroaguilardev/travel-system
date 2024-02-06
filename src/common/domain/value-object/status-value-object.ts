import { ErrorInvalidadArgument } from '../errors';

export type Status = 'active' | 'inactive';

export class StatusValueObject {
  private statusValues = ['active', 'inactive'] as const;
  constructor(readonly value: Status) {
    this.enSecureStatus(value);
  }

  private enSecureStatus(status: Status) {
    if (!this.statusValues.includes(status)) {
      throw new ErrorInvalidadArgument('No es un estado válido en el sistema');
    }
  }
}
