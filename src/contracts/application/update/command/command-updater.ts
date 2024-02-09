import { Uuid, UuidOptional } from '../../../../common/domain/value-object';
import {
  ContractInterface,
  ServicesInterface,
} from '../../../domain/interfaces';
import { Contract } from '../../../domain/contract';
import {
  ContractNumber,
  ContractStatus,
  ContractStartDate,
  ContractEndDate,
  ContractServices,
  ContractGuideNumber,
  ContractPets,
} from '../../../domain/value-object';
import { CommandContractTravel } from './command-travel';
import { CommandContractCage } from './command-cage';
import { CommandContractDocumentation } from './command-documentation';

export class CommandUpdater {
  static execute(
    data: ContractInterface,
    contract: ContractInterface,
  ): Contract {
    const services = CommandUpdater.services(data, contract);
    return new Contract(
      new Uuid(contract.id),
      new ContractNumber(data?.number ?? contract.number),
      new Uuid(data?.client ?? contract.client),
      new ContractStatus(contract.status),
      new ContractStartDate(data?.startDate ?? contract.startDate),
      new ContractEndDate(contract.endDate),
      new ContractServices(
        CommandContractDocumentation.execute(services.documentation),
        CommandContractCage.execute(services.cage),
        CommandContractTravel.execute(services.travel),
      ),
      new ContractGuideNumber(contract.guideNumber),
      new ContractPets(data?.pets ?? contract.pets),
      new UuidOptional(data.user),
    );
  }

  private static services(
    data: ContractInterface,
    contract: ContractInterface,
  ): ServicesInterface {
    const { cage, documentation, travel } = data.services;
    const { services } = contract;
    return {
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
          user: services.documentation.vaccinationCertificate.user,
        },
        healthCertificate: {
          hasServiceIncluded:
            documentation?.healthCertificate?.hasServiceIncluded ??
            services.documentation.healthCertificate.hasServiceIncluded,
          isApplied: services.documentation.healthCertificate.isApplied,
          expectedDate: services.documentation.healthCertificate.expectedDate,
          executionDate: services.documentation.healthCertificate.executionDate,
          user: services.documentation.healthCertificate.user,
        },
        chipCertificate: {
          hasServiceIncluded:
            documentation?.chipCertificate?.hasServiceIncluded ??
            services.documentation.chipCertificate.hasServiceIncluded,
          isApplied: services.documentation.chipCertificate.isApplied,
          expectedDate: services.documentation.chipCertificate.expectedDate,
          executionDate: services.documentation.chipCertificate.executionDate,
          user: services.documentation.chipCertificate.user,
        },
        senasaDocuments: {
          hasServiceIncluded:
            documentation?.senasaDocuments?.hasServiceIncluded ??
            services.documentation.senasaDocuments.hasServiceIncluded,
          isApplied: services.documentation.senasaDocuments.isApplied,
          expectedDate: services.documentation.senasaDocuments.expectedDate,
          executionDate: services.documentation.senasaDocuments.executionDate,
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
          user: services.documentation.rabiesSeroLogicalTest.user,
        },
        importLicense: {
          hasServiceIncluded:
            documentation?.importLicense?.hasServiceIncluded ??
            services.documentation.importLicense.hasServiceIncluded,
          isApplied: services.documentation.importLicense.isApplied,
          expectedDate: services.documentation.importLicense.expectedDate,
          executionDate: services.documentation.importLicense.executionDate,
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
          user: services.documentation.emotionalSupportCertificate.user,
        },
      },
      travel: {
        hasServiceIncluded:
          travel?.hasServiceIncluded ??
          contract.services.travel.hasServiceIncluded,
        hasServiceAccompanied:
          travel?.hasServiceAccompanied ??
          contract.services.travel.hasServiceAccompanied,
        typeTraveling:
          travel?.typeTraveling ?? contract.services.travel.typeTraveling,
        airlineReservation: services.travel.airlineReservation,
        petPerCharge: services.travel.petPerCharge,
        status: services.travel.status,
      },
    };
  }
}
