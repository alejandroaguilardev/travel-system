import { CustomerPaymentInterface } from './customer-payment.interface';
import { PayInInstallmentInterface } from './pay-in-installment.interface';
import { StatusInterface } from './status.interface';
import { ContractDetailInterface } from '../../../contract-detail/domain/interfaces/contract-detail.interface';

export interface ContractInterface {
  id: string;
  folder: string;
  number: string;
  client: string;
  status: StatusInterface;
  startDate: Date;
  endDate: Date;
  details: ContractDetailInterface[];
  adviser: string;
  price: number;
  payInInstallments?: PayInInstallmentInterface[];
  customerPayments?: CustomerPaymentInterface[];
  user: string;
}
