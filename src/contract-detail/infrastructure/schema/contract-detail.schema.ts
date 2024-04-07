import { Prop } from '@nestjs/mongoose';
import { ContractDetailInterface } from '../../domain/interfaces/contract-detail.interface';
import { DocumentationInterface } from '../../domain/interfaces/documentation.interface';
import { CageInterface } from '../../domain/interfaces/cage.interface';
import { TravelInterface } from '../../domain/interfaces/travel.interface';
import { ContractTopicoInterface } from '../../domain/interfaces/topico.interface';

export class ContractDetailModel implements ContractDetailInterface {
  @Prop({ type: String, index: true, unique: true, required: true })
  id: string;
  @Prop({ type: String, required: false, index: true })
  pet?: string;
  @Prop({
    type: {
      status: String,
      chipCertificate: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        user: String,
      },
      vaccinationCertificate: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        user: String,
      },
      rabiesSeroLogicalTest: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        user: String,
      },
      chipReview: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        user: String,
      },
      importLicense: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        user: String,
      },
      healthCertificate: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        user: String,
      },

      senasaDocuments: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
        user: String,
      },

      emotionalSupportCertificate: {
        hasServiceIncluded: Boolean,
        isRequired: Boolean,
        isApplied: Boolean,
        expectedDate: Date,
        executionDate: Date,
        resultDate: Date,
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
      },
      destination: {
        countryDestination: String,
        cityDestination: String,
        directionDestination: String,
      },
    },
    required: false,
  })
  travel: TravelInterface;

  @Prop({
    type: {
      chip: {
        hasIncluded: Boolean,
        executed: Boolean,
        date: Date,
        description: String,
        observation: String,
        user: String,
      },
      vaccination: {
        hasIncluded: Boolean,
        executed: Boolean,
        date: Date,
        description: String,
        observation: String,
        user: String,
      },
      rabiesVaccination: {
        hasIncluded: Boolean,
        executed: Boolean,
        date: Date,
        description: String,
        observation: String,
        user: String,
      },
      rabiesReVaccination: {
        executed: Boolean,
        date: Date,
        description: String,
        observation: String,
        user: String,
      },
      takingSampleSerologicalTest: {
        executed: Boolean,
        date: Date,
        description: String,
        observation: String,
        typeSample: String,
        user: String,
      },
    },
    required: false,
  })
  topico: ContractTopicoInterface;

  @Prop({ type: String, required: false })
  user: string;
}
