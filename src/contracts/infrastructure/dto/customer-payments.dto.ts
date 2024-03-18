import { IsDate, IsNumber, IsString } from 'class-validator';
import { CustomerPaymentInterface } from '../../../contracts/domain/interfaces/customer-payment.interface';

export class CustomerPaymentsDto implements CustomerPaymentInterface {
  @IsNumber()
  price: number;
  @IsDate()
  date: Date;
  @IsString()
  method: string;
}
