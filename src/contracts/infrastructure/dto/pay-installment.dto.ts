import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PayInInstallmentInterface } from '../../../contracts/domain/interfaces/pay-in-installment.interface';
import { CustomerPaymentInterface } from '../../../contracts/domain/interfaces/customer-payment.interface';
import { CustomerPaymentsDto } from './customer-payments.dto';

export class PayInInstallmentDto implements PayInInstallmentInterface {
  @IsNumber()
  price: number;
  @IsNumber()
  percentage: number;
  @IsDate()
  date: Date;
  @IsBoolean()
  isPay: boolean;
  @IsOptional()
  @Type(() => CustomerPaymentsDto)
  @ValidateNested({ each: true })
  customerPayments?: CustomerPaymentInterface[] = [];
}

export class PayInInstallmentArrayDto {
  @Type(() => PayInInstallmentDto)
  @ValidateNested({ each: true })
  payInInstallments: PayInInstallmentInterface[];
}
