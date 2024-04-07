import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { ContractInterface } from '../../domain/interfaces/contract.interface';
import { StatusInterface } from '../../domain/interfaces/status.interface';
import { CustomerPaymentInterface } from '../../domain/interfaces/customer-payment.interface';
import { PayInInstallmentInterface } from '../../domain/interfaces/pay-in-installment.interface';
import { ContractDetailModel } from '../../../contract-detail/infrastructure/schema/contract-detail.schema';
import { ContractDetailInterface } from '../../../contract-detail/domain/interfaces/contract-detail.interface';

@Schema({
  collection: 'contracts',
  ...SCHEMA_OPTIONS,
})
export class ContractModel implements ContractInterface {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;

  @Prop({ type: String, required: false })
  folder: string;

  @Prop({ type: String, required: false })
  number: string;

  @Prop({ type: String, required: true, index: true })
  client: string;

  @Prop({ type: [ContractDetailModel] })
  details: ContractDetailInterface[];

  @Prop({ type: String, required: true })
  status: StatusInterface;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: false })
  endDate: Date | null;

  @Prop({ type: String, required: false })
  adviser: string;

  @Prop({ type: Number, required: false })
  price: number;

  @Prop({
    type: [
      {
        price: Number,
        percentage: Number,
        date: Date,
      },
    ],
    required: false,
  })
  payInInstallments?: PayInInstallmentInterface[];

  @Prop({
    type: [
      {
        price: Number,
        date: Date,
        method: String,
      },
    ],
    required: false,
  })
  customerPayments?: CustomerPaymentInterface[];

  @Prop({ type: Boolean, required: false })
  finishClient: boolean;

  @Prop({ type: String, required: false })
  user: string;
}

export type ContractDocument = HydratedDocument<ContractModel>;
export const ContractSchema = SchemaFactory.createForClass(ContractModel);
