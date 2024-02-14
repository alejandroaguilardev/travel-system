import { Uuid, UuidOptional } from '../../common/domain/value-object';
import { ContractInterface, StatusInterface } from './interfaces';
import {
  ContractNumber,
  ContractStatus,
  ContractStartDate,
  ContractEndDate,
  ContractDetails,
} from './value-object';

export class Contract {
  constructor(
    readonly id: Uuid,
    readonly number: ContractNumber,
    readonly client: Uuid,
    readonly status: ContractStatus,
    readonly startDate: ContractStartDate,
    public endDate: ContractEndDate,
    readonly details: ContractDetails,
    readonly user: UuidOptional,
  ) {}

  toJson(): ContractInterface {
    return {
      id: this.id.value,
      number: this.number.value,
      client: this.client.value,
      status: this.status.value as StatusInterface,
      startDate: this.startDate.value,
      details: this.details.toJson(),
      endDate: this.endDate.value,
      user: this.user.value,
    };
  }

  // static establishedStatus(contract: ContractInterface): StatusInterface {
  //   let count = 0;
  //   Object.keys(contract.services).forEach((key) => {
  //     if (contract.services[key].status === 'completed') {
  //       ++count;
  //     }
  //   });

  //   if (count === 3) {
  //     contract.status = 'completed';
  //   } else if (count > 0) {
  //     contract.status = 'in-process';
  //   } else {
  //     contract.status = 'pending';
  //   }

  //   return contract.status;
  // }
}
