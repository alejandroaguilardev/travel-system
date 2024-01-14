import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';

@Schema({
  collection: 'roles',
  ...SCHEMA_OPTIONS,
})
export class RoleModel {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, unique: true, required: true })
  name: string;
  @Prop({ type: String, required: false })
  description: string;
  @Prop({ type: [{ type: String, ref: 'permissions' }], required: true })
  permissions: string[];
}

export type RoleDocument = HydratedDocument<RoleModel>;
export const RoleSchema = SchemaFactory.createForClass(RoleModel);
