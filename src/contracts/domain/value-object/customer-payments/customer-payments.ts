import { CustomerPaymentInterface } from '../../interfaces/customer-payment.interface';
import { CustomerPayment } from './customer-payment';

export class CustomerPayments {
  constructor(readonly value: CustomerPayment[]) {}

  toJson(): CustomerPaymentInterface[] {
    return this.value.map((_) => _.toJson());
  }
}
