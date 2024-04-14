import { PayInInstallmentInterface } from '../../interfaces/pay-in-installment.interface';
import { ContractDate } from '../contract-date';
import { ContractPrice } from '../contract-price';
import { CustomerPayments } from '../customer-payments/customer-payments';
import { ContractIsPay } from './contract-is-pay';
import { ContractPercentage } from './contract-percentage';

export class PayInInstallment {
  constructor(
    readonly price: ContractPrice,
    readonly percentage: ContractPercentage,
    readonly date: ContractDate,
    readonly isPay: ContractIsPay,
    readonly customerPayments: CustomerPayments,
  ) {}
  toJson(): PayInInstallmentInterface {
    return {
      price: this.price.value,
      percentage: this.percentage.value,
      date: this.date.value,
      isPay: this.isPay.value,
      customerPayments: this.customerPayments.toJson(),
    };
  }
}
