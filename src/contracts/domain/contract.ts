import { Uuid, UuidOptional } from '../../common/domain/value-object';
import { ContractInterface, StatusInterface } from './interfaces';
import { ContractDetailResponse } from '../../contract-detail/application/response/contract-detail.response';
import {
  ContractNumber,
  ContractStatus,
  ContractStartDate,
  ContractEndDate,
  ContractDetails,
} from './value-object';
import { ContractPrice } from './value-object/contract-price';
import { PayInInstallments } from './value-object/pay-in-installments/pay-in-installments';
import { CustomerPayments } from './value-object/customer-payments/customer-payments';
import { ContractFolder } from './value-object/contract-folder';

export class Contract {
  constructor(
    readonly id: Uuid,
    readonly folder: ContractFolder,
    readonly number: ContractNumber,
    readonly client: Uuid,
    public status: ContractStatus,
    readonly startDate: ContractStartDate,
    public endDate: ContractEndDate,
    public details: ContractDetails,
    readonly price: ContractPrice,
    readonly payInInstallments: PayInInstallments,
    readonly customerPayments: CustomerPayments,
    readonly adviser: Uuid,
    readonly user: UuidOptional,
  ) {}

  toJson(): ContractInterface {
    return {
      id: this.id.value,
      folder: this.folder.value,
      number: this.number.value,
      client: this.client.value,
      status: this.status.value as StatusInterface,
      startDate: this.startDate.value,
      details: this.details.toJson(),
      endDate: this.endDate.value,
      price: this.price.value,
      payInInstallments: this.payInInstallments.toJson(),
      customerPayments: this.customerPayments.toJson(),
      adviser: this.adviser.value,
      user: this.user.value,
    };
  }

  setDetails(details: ContractDetails) {
    this.details = details;
  }

  establishedStatus(contractDetail: ContractDetailResponse[]) {
    let count = 0;
    let countHasCompleted = 0;
    contractDetail.forEach((detail) => {
      const hasCompleted =
        detail.documentation.status === 'completed' &&
        detail.cage.status === 'completed' &&
        detail.travel.status === 'completed';
      count += 1;
      countHasCompleted += hasCompleted ? 1 : 0;
    });

    if (count === countHasCompleted) {
      this.status.value = 'completed';
    } else if (countHasCompleted > 0) {
      this.status.value = 'in-process';
    } else {
      this.status.value = 'pending';
    }
  }
}
