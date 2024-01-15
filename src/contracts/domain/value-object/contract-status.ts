import { StringValueObject } from '../../../common/domain/value-object/string-value-object';
import { StatusDefinition } from '../interfaces/status';
import { ErrorInvalidadArgument } from '../../../common/domain/errors/error-invalid-argument';

export class ContractStatus extends StringValueObject {
  static status: Record<'pending' | 'process' | 'finish', StatusDefinition> = {
    pending: 'pendiente',
    process: 'en proceso',
    finish: 'finalizado',
  };

  constructor(status: StatusDefinition) {
    super(status);
    this.validSecured(status);
  }

  private validSecured(status: StatusDefinition): void {
    if (!Object.values(ContractStatus.status).includes(status)) {
      throw new ErrorInvalidadArgument('El estado del contrato no es válido');
    }
  }
}
