import { CustomerPaymentInterface } from './customer-payment.interface';

export interface PayInInstallmentInterface {
  price: number;
  percentage: number;
  date: Date;
  isPay: boolean;
  customerPayments?: CustomerPaymentInterface[];
}
