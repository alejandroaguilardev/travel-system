import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { UserInterface } from '../../domain/interfaces/user.interface';
import { ProfileInterface } from '../../domain/interfaces/profile.interface';
import { UserAuthInterface } from '../../domain/interfaces/user-auth.interface';

@Schema({
  collection: 'users',
  ...SCHEMA_OPTIONS,
})
export class UserModel implements UserInterface {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, index: true, unique: true, required: true })
  email: string;
  @Prop({ type: String, required: false })
  password: string;
  @Prop({ type: [{ type: String, ref: 'roles' }], required: true })
  roles: string[];
  @Prop({
    type: {
      document: String,
      documentNumber: String,
      name: String,
      secondName: String,
      lastName: String,
      secondLastName: String,
      phone: String,
      gender: String,
      birthDate: Date,
      department: String,
      province: String,
      district: String,
      direction: String,
    },
    required: false,
  })
  profile: ProfileInterface;

  @Prop({ type: String, required: false })
  user?: string;
  @Prop({
    type: String,
    enum: ['active', 'inactive'],
    required: false,
  })
  status?: string;
  @Prop({
    type: {
      admin: Boolean,
      rememberToken: String,
      lastLogin: String,
    },
    required: false,
  })
  auth?: UserAuthInterface;
}

export type UserDocument = HydratedDocument<UserModel>;
export const UserSchema = SchemaFactory.createForClass(UserModel);
