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
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
        },
        healthCertificate: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
        },
        chipCertificate: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
        },
        senasaDocuments: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
        },
        rabiesSeroLogicalTest: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
        },
        importLicense: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
        },
        emotionalSupportCertificate: {
          hasServiceIncluded: Boolean,
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
          dimensionsCage: String,
        },
        recommendation: String,
      },
      travel: {
        status: String,
        hasServiceIncluded: Boolean,
        typeTraveling: String,
        airlineReservation: {
          code: String,
          flightNumber: String,
          departureAirport: String,
          destinationAirport: String,
          departureDate: Date,
          arrivalDate: Date,
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
