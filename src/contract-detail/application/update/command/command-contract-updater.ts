import { Uuid, UuidOptional } from '../../../../common/domain/value-object';
import { CommandContractTravel } from './command-travel';
import { CommandContractCage } from './command-cage';
import { CommandContractDocumentation } from './command-documentation';
import { ContractDetailInterface } from '../../../domain/interfaces/contract-detail.interface';
import { ContractDetail } from '../../../domain/contract-detail';
import { ContractGuideNumber } from '../../../domain/value-object/contract-guide-number';

export class CommandContractDetailsUpdater {
  static execute(
    contract: ContractDetailInterface,
    data?: Partial<ContractDetailInterface>,
  ): ContractDetail {
    const services = CommandContractDetailsUpdater.services(contract, data);
    return new ContractDetail(
      new Uuid(contract.id),
      CommandContractDocumentation.execute(services.documentation),
      CommandContractCage.execute(services.cage),
      CommandContractTravel.execute(services.travel),
      new ContractGuideNumber(contract.guideNumber),
      new UuidOptional(data?.pet ?? contract.pet),
      new UuidOptional(data?.user ?? contract.user),
    );
  }

  private static services(
    services: ContractDetailInterface,
    data: Partial<ContractDetailInterface>,
  ): ContractDetailInterface {
    const { cage, documentation, travel } = data;
    return {
      ...services,
      cage: {
        status: services.cage.status,
        hasServiceIncluded:
          cage?.hasServiceIncluded ?? services.cage.hasServiceIncluded,
        chosen: {
          modelCage:
            cage?.chosen?.modelCage ?? services.cage.chosen?.modelCage ?? '',
          dimensionsCage:
            cage?.chosen?.dimensionsCage ??
            services.cage.chosen?.dimensionsCage ??
            '',
          typeCage:
            cage?.chosen?.typeCage ?? services.cage.chosen?.typeCage ?? '',
          user: services.cage.chosen.user,
        },
        recommendation: services.cage.recommendation,
      },
      documentation: {
        status: services.documentation.status,
        vaccinationCertificate: {
          hasServiceIncluded:
            documentation?.vaccinationCertificate?.hasServiceIncluded ??
            services.documentation.vaccinationCertificate.hasServiceIncluded,
          isApplied: services.documentation.vaccinationCertificate.isApplied,
          expectedDate:
            services.documentation.vaccinationCertificate.expectedDate,
          executionDate:
            services.documentation.vaccinationCertificate.executionDate,
          resultDate: services.documentation.vaccinationCertificate.resultDate,
          user: services.documentation.vaccinationCertificate.user,
        },
        healthCertificate: {
          hasServiceIncluded:
            documentation?.healthCertificate?.hasServiceIncluded ??
            services.documentation.healthCertificate.hasServiceIncluded,
          isApplied: services.documentation.healthCertificate.isApplied,
          expectedDate: services.documentation.healthCertificate.expectedDate,
          executionDate: services.documentation.healthCertificate.executionDate,
          resultDate: services.documentation.healthCertificate.resultDate,
          user: services.documentation.healthCertificate.user,
        },
        chipCertificate: {
          hasServiceIncluded:
            documentation?.chipCertificate?.hasServiceIncluded ??
            services.documentation.chipCertificate.hasServiceIncluded,
          isApplied: services.documentation.chipCertificate.isApplied,
          expectedDate: services.documentation.chipCertificate.expectedDate,
          executionDate: services.documentation.chipCertificate.executionDate,
          resultDate: services.documentation.chipCertificate.resultDate,
          user: services.documentation.chipCertificate.user,
        },
        chipReview: {
          hasServiceIncluded:
            documentation?.chipReview?.hasServiceIncluded ??
            services.documentation.chipReview.hasServiceIncluded,
          isApplied: services.documentation.chipReview.isApplied,
          expectedDate: services.documentation.chipReview.expectedDate,
          executionDate: services.documentation.chipReview.executionDate,
          resultDate: services.documentation.chipReview.resultDate,
          user: services.documentation.chipReview.user,
        },
        senasaDocuments: {
          hasServiceIncluded:
            documentation?.senasaDocuments?.hasServiceIncluded ??
            services.documentation.senasaDocuments.hasServiceIncluded,
          isApplied: services.documentation.senasaDocuments.isApplied,
          expectedDate: services.documentation.senasaDocuments.expectedDate,
          executionDate: services.documentation.senasaDocuments.executionDate,
          resultDate: services.documentation.senasaDocuments.resultDate,
          user: services.documentation.senasaDocuments.user,
        },
        rabiesSeroLogicalTest: {
          hasServiceIncluded:
            documentation?.rabiesSeroLogicalTest?.hasServiceIncluded ??
            services.documentation.rabiesSeroLogicalTest.hasServiceIncluded,
          isApplied: services.documentation.rabiesSeroLogicalTest.isApplied,
          expectedDate:
            services.documentation.rabiesSeroLogicalTest.expectedDate,
          executionDate:
            services.documentation.rabiesSeroLogicalTest.executionDate,
          resultDate: services.documentation.rabiesSeroLogicalTest.resultDate,
          user: services.documentation.rabiesSeroLogicalTest.user,
        },
        importLicense: {
          hasServiceIncluded:
            documentation?.importLicense?.hasServiceIncluded ??
            services.documentation.importLicense.hasServiceIncluded,
          isApplied: services.documentation.importLicense.isApplied,
          expectedDate: services.documentation.importLicense.expectedDate,
          executionDate: services.documentation.importLicense.executionDate,
          resultDate: services.documentation.importLicense.resultDate,
          user: services.documentation.importLicense.user,
        },
        emotionalSupportCertificate: {
          hasServiceIncluded:
            documentation?.emotionalSupportCertificate?.hasServiceIncluded ??
            services.documentation.emotionalSupportCertificate
              .hasServiceIncluded,
          isApplied:
            services.documentation.emotionalSupportCertificate.isApplied,
          expectedDate:
            services.documentation.emotionalSupportCertificate.expectedDate,
          executionDate:
            services.documentation.emotionalSupportCertificate.executionDate,
          resultDate:
            services.documentation.emotionalSupportCertificate.resultDate,
          user: services.documentation.emotionalSupportCertificate.user,
        },
      },
      travel: {
        hasServiceIncluded:
          travel?.hasServiceIncluded ?? services.travel.hasServiceIncluded,
        hasServiceAccompanied:
          travel?.hasServiceAccompanied ??
          services.travel.hasServiceAccompanied,
        typeTraveling: travel?.typeTraveling ?? services.travel.typeTraveling,
        airlineReservation: services.travel.airlineReservation,
        petPerCharge: services.travel.petPerCharge,
        accompaniedPet: services.travel.accompaniedPet,
        destination: services.travel.destination,
        status: services.travel.status,
      },
    };
  }
}
