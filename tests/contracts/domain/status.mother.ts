import { ContractStatusDetail } from '../../../src/common/domain/value-object/contract-status-detail';
import { StatusInterface } from '../../../src/contracts/domain/interfaces/status.interface';

export class StatusMother {
  static create(): StatusInterface {
    const randomIndex = Math.floor(
      Math.random() * ContractStatusDetail.values.length,
    );
    return ContractStatusDetail.values[randomIndex];
  }
}
