import { Prop } from '@nestjs/mongoose';
import { ContractDetailInterface } from '../../domain/interfaces/contract-detail.interface';
import { DocumentationInterface } from '../../domain/interfaces/documentation.interface';
import { CageInterface } from '../../domain/interfaces/cage.interface';
import { TravelInterface } from '../../domain/interfaces/travel.interface';
import { ContractTopicoInterface } from '../../domain/interfaces/topico.interface';
import { topicoSchema } from './topico.schema';

export class ContractDetailModel implements ContractDetailInterface {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, required: false, index: true })
  pet?: string;
  @Prop({
    type: {
      status: String,
      clientStatus: String,
      chipCertificate: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        observation: String,
        isPrint: Boolean,
        user: String,
      },
      vaccinationCertificate: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        observation: String,
        isPrint: Boolean,
        user: String,
      },
      rabiesSeroLogicalTest: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        observation: String,
        isPrint: Boolean,
        user: String,
      },
      importLicense: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        observation: String,
        isPrint: Boolean,
        user: String,
      },
      healthCertificate: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        observation: String,
        isPrint: Boolean,
        user: String,
      },

      senasaDocuments: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        observation: String,
        isPrint: Boolean,
        user: String,
      },

      emotionalSupportCertificate: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        observation: String,
        isPrint: Boolean,
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
      confirmation: Boolean,

      petTravelAcquisition: Boolean,
      isCabinTransporting: Boolean,
    },
    required: false,
  })
  cage: CageInterface;
  @Prop({
    type: {
      guideNumber: String,
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
        itinerary: String,
        archive: String,
        user: String,
      },
      petPerCharge: {
        name: String,
        document: String,
        documentNumber: String,
        phone: String,
        email: String,
      },
      accompaniedPet: {
        name: String,
        document: String,
        documentNumber: String,
        phone: String,
        email: String,
        direction: String,
        district: String,
        province: String,
        department: String,
        image: String,
      },
      destination: {
        countryDestination: String,
        cityDestination: String,
        directionDestination: String,
      },
      observation: String,
    },
    required: false,
  })
  travel: TravelInterface;

  @Prop(topicoSchema)
  topico: ContractTopicoInterface;

  @Prop({ type: String, required: false })
  user: string;
}
