import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SCHEMA_OPTIONS } from '../../../common/infrastructure/mongo/schema-options';
import { ContractDetailInterface } from '../../domain/interfaces/contract-detail.interface';
import { DocumentationInterface } from '../../domain/interfaces/documentation.interface';
import { CageInterface } from '../../domain/interfaces/cage.interface';
import { TravelInterface } from '../../domain/interfaces/travel.interface';

@Schema({
  collection: 'contract-detail',
  ...SCHEMA_OPTIONS,
})
export class ContractDetailModel implements ContractDetailInterface {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, required: true, index: true })
  pet: string;
  @Prop({
    type: {
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
    required: false,
  })
  documentation: DocumentationInterface;
  @Prop({
    type: {
      status: String,
      hasServiceIncluded: Boolean,
      chosen: {
        modelCage: String,
        typeCage: String,
        dimensionsCage: String,
        user: String,
      },
      recommendation: {
        modelCage: String,
        typeCage: String,
        dimensionsCage: String,
      },
    },
    required: false,
  })
  cage: CageInterface;
  @Prop({
    type: {
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
    required: false,
  })
  travel: TravelInterface;
  @Prop({ type: String, required: false })
  guideNumber: string;
  @Prop({ type: String, required: false })
  user: string;
}

export type ContractDetailDocument = HydratedDocument<ContractDetailModel>;
export const ContractDetailSchema =
  SchemaFactory.createForClass(ContractDetailModel);
