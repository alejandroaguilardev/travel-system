import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { ProvinceInterface } from '../../domain/interfaces/province.interface';

@Schema({
  collection: 'provinces',
  ...SCHEMA_OPTIONS,
})
export class ProvinceModel implements ProvinceInterface {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, index: true, required: true })
  department_id: string;
  @Prop({ type: String, required: true })
  name: string;
}

export type ProvinceDocument = HydratedDocument<ProvinceModel>;
export const ProvinceSchema = SchemaFactory.createForClass(ProvinceModel);
