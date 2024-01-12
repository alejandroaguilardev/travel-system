import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';

@Schema({
  collection: 'users',
  ...SCHEMA_OPTIONS,
})
export class UserModel {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: false })
  secondName: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String, required: false })
  secondLastName: string;
  @Prop({ type: String, index: true, unique: true, required: true })
  email: string;
  @Prop({ type: String, required: false })
  password: string;
  @Prop({ type: [{ type: String, ref: 'roles' }], required: true })
  roles: string[];
}

export type UserDocument = HydratedDocument<UserModel>;
export const UserSchema = SchemaFactory.createForClass(UserModel);
