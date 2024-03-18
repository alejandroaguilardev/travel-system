import { CustomerPaymentInterface } from '../../interfaces/customer-payment.interface';
import { ContractDate } from '../contract-date';
import { ContractPrice } from '../contract-price';
import { CustomerPaymentMethod } from './customer-payment-method';

export class CustomerPayment {
  constructor(
    readonly price: ContractPrice,
    readonly method: CustomerPaymentMethod,
    readonly date: ContractDate,
  ) {}

  toJson(): CustomerPaymentInterface {
    return {
      price: this.price.value,
      method: this.method.value,
      date: this.date.value,
    };
  }
}
