import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { ContractInterface } from '../../domain/interfaces/contract.interface';
import { StatusInterface } from '../../domain/interfaces/status.interface';

@Schema({
  collection: 'contracts',
  ...SCHEMA_OPTIONS,
})
export class ContractModel implements ContractInterface {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;

  @Prop({ type: String, required: false })
  number: string;

  @Prop({ type: String, required: true, index: true })
  client: string;

  @Prop({ type: [String], required: true, index: true })
  details: string[];

  @Prop({ type: String, required: true })
  status: StatusInterface;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: false })
  endDate: Date | null;

  @Prop({ type: String, required: false })
  adviser: string;

  @Prop({ type: String, required: false })
  user: string;
}

export type ContractDocument = HydratedDocument<ContractModel>;
export const ContractSchema = SchemaFactory.createForClass(ContractModel);
