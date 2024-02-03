import { ContractStatus } from '../../../src/contracts/domain/value-object/contract-status';
import { StatusInterface } from '../../../src/contracts/domain/interfaces/status.interface';

export class StatusMother {
  static create(): StatusInterface {
    const randomIndex = Math.floor(
      Math.random() * ContractStatus.values.length,
    );
    return ContractStatus.values[randomIndex];
  }
}
