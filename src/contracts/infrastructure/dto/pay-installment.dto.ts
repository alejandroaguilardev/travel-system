import { IsDate, IsNumber } from 'class-validator';
import { PayInInstallmentInterface } from '../../../contracts/domain/interfaces/pay-in-installment.interface';

export class PayInInstallmentDto implements PayInInstallmentInterface {
  @IsNumber()
  price: number;
  @IsNumber()
  percentage: number;
  @IsDate()
  date: Date;
}
