import { StatusInterface } from '../../../contracts/domain/interfaces/status.interface';
import { ErrorInvalidadArgument } from '../errors/error-invalid-argument';

export class ContractStatus {
  static values: StatusInterface[] = [
    'none',
    'pending',
    'in-process',
    'completed',
    'canceled',
    'suspended',
  ];

  constructor(public value: StatusInterface) {
    this.validSecured(value);
  }

  private validSecured(value: StatusInterface): void {
    if (!ContractStatus.values.includes(value)) {
      throw new ErrorInvalidadArgument('No es un estado válido');
    }
  }

  statusError() {
    if (
      this.value === 'canceled' ||
      this.value === 'none' ||
      this.value === 'suspended' ||
      this.value === 'completed'
    ) {
      throw new ErrorInvalidadArgument(
        'El contrato se encuentra ' + this.value,
      );
    }
  }
}
