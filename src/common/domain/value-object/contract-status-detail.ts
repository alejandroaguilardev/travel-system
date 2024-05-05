import { StatusInterface } from '../../../contracts/domain/interfaces/status.interface';
import { ErrorInvalidadArgument } from '../errors/error-invalid-argument';

export class ContractStatusDetail {
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
    if (!ContractStatusDetail.values.includes(value)) {
      throw new ErrorInvalidadArgument('No es un estado válido');
    }
  }

  statusError(endDate: Date | null) {
    if (
      (this.value === 'canceled' ||
        this.value === 'none' ||
        this.value === 'suspended' ||
        this.value === 'completed') &&
      endDate
    ) {
      throw new ErrorInvalidadArgument(
        'El contrato se encuentra ' + this.value,
      );
    }
  }
}
