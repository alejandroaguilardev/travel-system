import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';

@Schema({
  collection: 'errors',
  ...SCHEMA_OPTIONS,
})
export class ErrorModel {
  @Prop({
    type: String,
    index: true,
    unique: true,
    required: true,
  })
  id: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  body: string;
  @Prop({ type: String, required: true })
  error: string;
  @Prop({ type: Date, required: true })
  date_error: string;
}

export type ErrorDocument = HydratedDocument<ErrorModel>;
export const ErrorSchema = SchemaFactory.createForClass(ErrorModel);
