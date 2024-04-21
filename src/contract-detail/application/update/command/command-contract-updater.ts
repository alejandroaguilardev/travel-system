import { Uuid, UuidOptional } from '../../../../common/domain/value-object';
import { CommandContractTravel } from './command-travel';
import { CommandContractCage } from './command-cage';
import { CommandContractDocumentation } from './command-documentation';
import { ContractDetailInterface } from '../../../domain/interfaces/contract-detail.interface';
import { ContractDetail } from '../../../domain/contract-detail';
import { CommandContractTopico } from './topico-command';

export class CommandContractDetailsUpdater {
  static execute(
    contract: ContractDetailInterface[],
    data?: Partial<ContractDetailInterface[]>,
  ): ContractDetail[] {
    return contract.map((detail) =>
      CommandContractDetailsUpdater.detail(
        detail,
        data?.find((_) => detail.id === _.id),
      ),
    );
  }
  static detail(
    contract: ContractDetailInterface,
    data?: Partial<ContractDetailInterface>,
  ): ContractDetail {
    const services = CommandContractDetailsUpdater.services(contract, data);
    return new ContractDetail(
      new Uuid(contract.id),
      CommandContractDocumentation.execute(services.documentation),
      CommandContractCage.execute(services.cage),
      CommandContractTravel.execute(services.travel),
      new UuidOptional(data?.pet ?? contract.pet),
      new UuidOptional(data?.user ?? contract.user),
      CommandContractTopico.execute(contract?.topico),
    );
  }

  private static services(
    services: ContractDetailInterface,
    data: Partial<ContractDetailInterface>,
  ): ContractDetailInterface {
    const { cage, documentation, travel } = data ?? {
      cage: undefined,
      documentation: undefined,
      travel: undefined,
    };
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
        confirmation: cage?.confirmation ?? services.cage.confirmation,
        petTravelAcquisition:
          cage?.petTravelAcquisition ?? services.cage.petTravelAcquisition,
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
          isRequired: services.documentation.vaccinationCertificate.isRequired,
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
          isRequired: services.documentation.healthCertificate.isRequired,
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
          isRequired: services.documentation.chipCertificate.isRequired,
          user: services.documentation.chipCertificate.user,
        },
        senasaDocuments: {
          hasServiceIncluded:
            documentation?.senasaDocuments?.hasServiceIncluded ??
            services.documentation.senasaDocuments.hasServiceIncluded,
          isApplied: services.documentation.senasaDocuments.isApplied,
          expectedDate: services.documentation.senasaDocuments.expectedDate,
          executionDate: services.documentation.senasaDocuments.executionDate,
          resultDate: services.documentation.senasaDocuments.resultDate,
          isRequired: services.documentation.senasaDocuments.isRequired,
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
          isRequired: services.documentation.rabiesSeroLogicalTest.isRequired,
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
          isRequired: services.documentation.importLicense.isRequired,
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
          isRequired:
            services.documentation.emotionalSupportCertificate.isRequired,
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
        destination: {
          cityDestination:
            travel?.destination?.cityDestination ??
            services.travel.destination.cityDestination,
          countryDestination:
            travel?.destination?.countryDestination ??
            services.travel.destination.countryDestination,
          directionDestination:
            travel?.destination?.directionDestination ??
            services.travel.destination.directionDestination,
        },
        status: services.travel.status,
        guideNumber: travel?.guideNumber ?? services.travel.guideNumber,
      },
    };
  }
}
