import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { PetInterface } from '../../domain/interfaces/pet.interface';
import { PetGenderType } from '../../domain/value-object/pet-gender';
import { Status } from '../../../common/domain/value-object/status-value-object';
import { CageChosenInterface } from '../../../contract-detail/domain/interfaces/cage.interface';
import { MeasurementsAndWeightInterface } from '../../domain/interfaces/pet-measurements-and-weight';
import { topicoSchema } from '../../../contract-detail/infrastructure/schema/topico.schema';
import { ContractTopicoInterface } from '../../../contract-detail/domain/interfaces/topico.interface';

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
  gender: PetGenderType;
  @Prop({ type: Date, required: true })
  birthDate: Date;
  @Prop({ type: String, required: false })
  chip: string;
  @Prop({ type: Date, required: false })
  chipDate: Date | null;
  @Prop({ type: String, required: false })
  color: string;
  @Prop({ type: String, required: false })
  image: string;
  @Prop({ type: String, required: false })
  country: string;
  @Prop({ type: String, required: false })
  type: string;
  @Prop({ type: String, required: false })
  sterilized: string;
  @Prop({ type: String, required: false })
  status: Status;
  @Prop({ type: String, required: false })
  adopter: string;
  @Prop({ type: Boolean, required: false })
  isBrachycephalic: boolean;

  @Prop({ type: Boolean, required: false })
  isPotentiallyDangerous: boolean;

  @Prop(topicoSchema)
  topico: ContractTopicoInterface;

  @Prop({ type: String, required: false })
  user: string;
  @Prop({
    type: {
      modelCage: String,
      typeCage: String,
      dimensionsCage: String,
    },
    required: false,
  })
  cageRecommendation: CageChosenInterface;
  @Prop({
    type: {
      weight: Number,
      height: Number,
      width: Number,
      length: Number,
    },
    required: false,
  })
  measurementsAndWeight: MeasurementsAndWeightInterface;
}

export type PetDocument = HydratedDocument<PetModel>;
export const PetSchema = SchemaFactory.createForClass(PetModel);
