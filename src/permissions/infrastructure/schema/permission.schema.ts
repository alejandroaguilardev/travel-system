import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';

@Schema({
  collection: 'permissions',
  ...SCHEMA_OPTIONS,
})
export class PermissionModel {
  @Prop({
    type: String,
    index: true,
    unique: true,
    required: true,
    _id: true,
  })
  id: string;
  @Prop({ type: String, unique: true, required: true })
  name: string;
  @Prop({ type: String, required: false })
  description: string;
}

export type PermissionDocument = HydratedDocument<PermissionModel>;
export const PermissionSchema = SchemaFactory.createForClass(PermissionModel);
