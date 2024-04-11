import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { DepartmentInterface } from '../../domain/interfaces/department.interface';

@Schema({
  collection: 'department',
  ...SCHEMA_OPTIONS,
})
export class DepartmentModel implements DepartmentInterface {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, required: true })
  name: string;
}

export type DepartmentDocument = HydratedDocument<DepartmentModel>;
export const DepartmentSchema = SchemaFactory.createForClass(DepartmentModel);
