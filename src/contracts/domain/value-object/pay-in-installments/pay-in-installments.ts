import { PayInInstallmentInterface } from '../../interfaces/pay-in-installment.interface';
import { PayInInstallment } from './pay-in-installment';

export class PayInInstallments {
  constructor(readonly value: PayInInstallment[]) {}

  toJson(): PayInInstallmentInterface[] {
    return this.value.map((_) => _.toJson());
  }
}
