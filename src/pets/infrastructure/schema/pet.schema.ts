import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { PetInterface } from '../../domain/interfaces/pet.interface';

@Schema({
  collection: 'pets',
  ...SCHEMA_OPTIONS,
})
export class PetModel implements PetInterface {
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
  race: string;
  @Prop({ type: String, required: true })
  gender: string;
  @Prop({ type: Date, required: true })
  birthDate: Date;
  @Prop({ type: String, required: false })
  chip?: string;
  @Prop({ type: String, required: false })
  color: string;
  @Prop({ type: String, required: false })
  image: string;
}

export type PetDocument = HydratedDocument<PetModel>;
export const PetSchema = SchemaFactory.createForClass(PetModel);
