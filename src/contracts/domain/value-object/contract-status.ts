import { ContractStatusDetail } from '.';
import { ContractStatusInterface } from '../../../contracts/domain/interfaces/contract.interface';

export class ContractStatus {
  constructor(
    readonly petTravel: ContractStatusDetail,
    readonly client: ContractStatusDetail,
  ) {}

  toJson(): ContractStatusInterface {
    return {
      petTravel: this.petTravel.value,
      client: this.client.value,
    };
  }
}
