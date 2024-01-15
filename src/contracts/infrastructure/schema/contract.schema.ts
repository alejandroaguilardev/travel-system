import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { ServicesDefinition } from '../../domain/interfaces/services';
import { ContractDefinition } from '../../domain/interfaces/contract';
import { StatusDefinition } from '../../domain/interfaces/status';

@Schema({
  collection: 'contracts',
  ...SCHEMA_OPTIONS,
})
export class ContractModel implements ContractDefinition {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, required: true, unique: true })
  number: string;
  @Prop({ type: String, required: true, index: true })
  client: string;
  @Prop({ type: [String], required: true, index: true })
  pets: string[];
  @Prop({ type: String, required: true })
  status: StatusDefinition;
  @Prop({ type: Date, required: true })
  startDate: Date;
  @Prop({ type: Date, required: false })
  endDate: Date | null;
  @Prop({
    type: {
      documentation: {
        status: String,
        hasServiceIncluded: Boolean,
        vaccinationCertificate: {
          isApplied: Boolean,
        },
        healthCertificate: {
          isApplied: Boolean,
        },
        chipCertificate: {
          isApplied: Boolean,
        },
        senasaDocuments: {
          isApplied: Boolean,
        },
        rabiesSeroLogicalTest: {
          isApplied: Boolean,
        },
        importLicense: {
          isApplied: Boolean,
        },
        emotionalSupportCertificate: {
          isApplied: Boolean,
        },
      },
      cage: {
        status: String,
        hasServiceIncluded: Boolean,
        swornDeclaration: Boolean,
        chosen: {
          modelCage: String,
          typeCage: String,
        },
        recommendation: String,
      },
      travel: {
        status: String,
        hasServiceIncluded: Boolean,
        travelingWithPet: Boolean,
        airlineReservation: {
          code: String,
          flightNumber: String,
          departureAirport: String,
          destinationAirport: String,
          departureDate: Date,
        },
        petPerCharge: {
          receptor: String,
          email: String,
          phone: String,
          pickupDateTime: Date,
          pickupLocation: String,
          specialRequests: String,
        },
      },
    },
    required: false,
  })
  services: ServicesDefinition;
  @Prop({ type: String, required: false })
  guideNumber: string;
}

export type ContractDocument = HydratedDocument<ContractModel>;
export const ContractSchema = SchemaFactory.createForClass(ContractModel);
