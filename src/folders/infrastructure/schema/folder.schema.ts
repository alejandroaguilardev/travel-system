import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { FolderInterface } from '../../domain/interfaces/folder.interface';

@Schema({
  collection: 'folders',
  ...SCHEMA_OPTIONS,
})
export class FolderModel implements FolderInterface {
  @Prop({
    type: String,
    index: true,
    unique: true,
    required: true,
  })
  id: string;
  @Prop({ type: String, required: true, unique: true })
  name: string;
  @Prop({ type: Number, required: true })
  quantity: number;
  @Prop({ type: String, required: false })
  user?: string;
}

export type FolderDocument = HydratedDocument<FolderModel>;
export const FolderSchema = SchemaFactory.createForClass(FolderModel);
