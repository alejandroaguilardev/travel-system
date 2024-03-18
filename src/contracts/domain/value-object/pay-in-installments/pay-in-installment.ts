import { PayInInstallmentInterface } from '../../interfaces/pay-in-installment.interface';
import { ContractDate } from '../contract-date';
import { ContractPrice } from '../contract-price';
import { ContractPercentage } from './contract-percentage';

export class PayInInstallment {
  constructor(
    readonly price: ContractPrice,
    readonly percentage: ContractPercentage,
    readonly date: ContractDate,
  ) {}
  toJson(): PayInInstallmentInterface {
    return {
      price: this.price.value,
      percentage: this.percentage.value,
      date: this.date.value,
    };
  }
}
