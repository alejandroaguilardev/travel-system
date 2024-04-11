import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { DistrictInterface } from '../../domain/interfaces/district.interface';

@Schema({
  collection: 'districts',
  ...SCHEMA_OPTIONS,
})
export class DistrictModel implements DistrictInterface {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, index: true, required: true })
  province_id: string;
  @Prop({ type: String, index: true, required: true })
  department_id: string;
  @Prop({ type: String, required: true })
  name: string;
}

export type DistrictDocument = HydratedDocument<DistrictModel>;
export const DistrictSchema = SchemaFactory.createForClass(DistrictModel);
