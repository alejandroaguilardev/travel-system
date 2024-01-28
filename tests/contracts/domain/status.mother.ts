import { ContractStatus } from '../../../src/contracts/domain/value-object/contract-status';
import { StatusDefinition } from '../../../src/contracts/domain/interfaces/status';

export class StatusMother {
  static create(): StatusDefinition {
    const randomIndex = Math.floor(
      Math.random() * ContractStatus.values.length,
    );
    return ContractStatus.values[randomIndex];
  }
}
