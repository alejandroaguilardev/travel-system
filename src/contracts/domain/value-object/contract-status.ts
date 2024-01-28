import { StatusDefinition } from '../interfaces/status';
import { ErrorInvalidadArgument } from '../../../common/domain/errors/error-invalid-argument';

export class ContractStatus {
  static values: StatusDefinition[] = [
    'none',
    'pending',
    'in-process',
    'completed',
    'canceled',
    'suspended',
  ];

  constructor(readonly value: StatusDefinition) {
    this.validSecured(value);
  }

  private validSecured(value: StatusDefinition): void {
    if (!ContractStatus.values.includes(value)) {
      throw new ErrorInvalidadArgument('No es un tipo de viaje válido');
    }
  }
}
