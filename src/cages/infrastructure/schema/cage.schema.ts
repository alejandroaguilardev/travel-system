import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { CageInterface } from '../../domain/interfaces/cage.interface';

@Schema({
  collection: 'cages',
  ...SCHEMA_OPTIONS,
})
export class CageModel implements CageInterface {
  @Prop({
    type: String,
    index: true,
    unique: true,
    required: true,
  })
  id: string;
  @Prop({ type: String, required: true })
  typeCage: string;
  @Prop({ type: String, required: true })
  modelCage: string;
  @Prop({ type: String, required: true })
  dimensionsCage: string;
  @Prop({ type: String, required: false })
  user?: string;
}

export type CageDocument = HydratedDocument<CageModel>;
export const CageSchema = SchemaFactory.createForClass(CageModel);
