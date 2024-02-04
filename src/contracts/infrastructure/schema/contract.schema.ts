import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { ContractInterface } from '../../domain/interfaces/contract.interface';
import { ServicesInterface } from '../../domain/interfaces/services.interface';
import { StatusInterface } from '../../domain/interfaces/status.interface';

@Schema({
  collection: 'contracts',
  ...SCHEMA_OPTIONS,
})
export class ContractModel implements ContractInterface {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, required: true, unique: true })
  number: string;
  @Prop({ type: String, required: true, index: true })
  client: string;
  @Prop({ type: [String], required: true, index: true })
  pets: string[];
  @Prop({ type: String, required: true })
  status: StatusInterface;
  @Prop({ type: Date, required: true })
  startDate: Date;
  @Prop({ type: Date, required: false })
  endDate: Date | null;
  @Prop({
    type: {
      documentation: {
        status: String,
        vaccinationCertificate: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
          expectedDate: Date,
          executionDate: Date,
          user: String,
        },
        healthCertificate: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
          expectedDate: Date,
          executionDate: Date,
          user: String,
        },
        chipCertificate: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
          expectedDate: Date,
          executionDate: Date,
          user: String,
        },
        senasaDocuments: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
          expectedDate: Date,
          executionDate: Date,
          user: String,
        },
        rabiesSeroLogicalTest: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
          expectedDate: Date,
          executionDate: Date,
          user: String,
        },
        importLicense: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
          expectedDate: Date,
          executionDate: Date,
          user: String,
        },
        emotionalSupportCertificate: {
          hasServiceIncluded: Boolean,
          isApplied: Boolean,
          expectedDate: Date,
          executionDate: Date,
          user: String,
        },
      },
      cage: {
        status: String,
        hasServiceIncluded: Boolean,
        chosen: {
          modelCage: String,
          typeCage: String,
          dimensionsCage: String,
          user: String,
        },
        recommendation: String,
      },
      travel: {
        status: String,
        hasServiceIncluded: Boolean,
        hasServiceAccompanied: Boolean,
        typeTraveling: String,
        airlineReservation: {
          code: String,
          flightNumber: String,
          departureAirport: String,
          destinationAirport: String,
          departureDate: Date,
          arrivalDate: Date,
          user: String,
        },
        petPerCharge: {
          receptor: String,
          email: String,
          phone: String,
          pickupDateTime: Date,
          pickupLocation: String,
          specialRequests: String,
          user: String,
        },
      },
    },
    required: false,
  })
  services: ServicesInterface;
  @Prop({ type: String, required: false })
  guideNumber: string;
  @Prop({ type: String, required: false })
  user: string;
}

export type ContractDocument = HydratedDocument<ContractModel>;
export const ContractSchema = SchemaFactory.createForClass(ContractModel);
