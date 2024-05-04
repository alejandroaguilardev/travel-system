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
        isCabinTransporting:
          cage?.isCabinTransporting ?? services.cage.isCabinTransporting,
      },
      documentation: {
        status: services.documentation.status,
        vaccinationCertificate: {
          hasServiceIncluded:
            documentation?.vaccinationCertificate?.hasServiceIncluded ??
            services.documentation.vaccinationCertificate.hasServiceIncluded,
          isRequired:
            documentation?.vaccinationCertificate?.isRequired ??
            services.documentation.vaccinationCertificate.isRequired,
          expectedDate:
            documentation?.vaccinationCertificate?.expectedDate ??
            services.documentation.vaccinationCertificate.expectedDate,
          isApplied: services.documentation.vaccinationCertificate.isApplied,
          executionDate:
            services.documentation.vaccinationCertificate.executionDate,
          resultDate: services.documentation.vaccinationCertificate.resultDate,
          observation:
            services.documentation.vaccinationCertificate.observation,
          isPrint: services.documentation.vaccinationCertificate.isPrint,
          user: services.documentation.vaccinationCertificate.user,
        },
        healthCertificate: {
          hasServiceIncluded:
            documentation?.healthCertificate?.hasServiceIncluded ??
            services.documentation.healthCertificate.hasServiceIncluded,
          isRequired:
            documentation?.healthCertificate?.isRequired ??
            services.documentation.healthCertificate.isRequired,
          expectedDate:
            documentation?.healthCertificate?.expectedDate ??
            services.documentation.healthCertificate.expectedDate,
          isApplied: services.documentation.healthCertificate.isApplied,
          executionDate: services.documentation.healthCertificate.executionDate,
          resultDate: services.documentation.healthCertificate.resultDate,
          observation: services.documentation.healthCertificate.observation,
          isPrint: services.documentation.healthCertificate.isPrint,
          user: services.documentation.healthCertificate.user,
        },
        chipCertificate: {
          hasServiceIncluded:
            documentation?.chipCertificate?.hasServiceIncluded ??
            services.documentation.chipCertificate.hasServiceIncluded,
          isRequired:
            documentation?.chipCertificate?.isRequired ??
            services.documentation.chipCertificate.isRequired,
          expectedDate:
            documentation?.chipCertificate?.expectedDate ??
            services.documentation.chipCertificate.expectedDate,
          isApplied: services.documentation.chipCertificate.isApplied,
          executionDate: services.documentation.chipCertificate.executionDate,
          resultDate: services.documentation.chipCertificate.resultDate,
          observation: services.documentation.chipCertificate.observation,
          isPrint: services.documentation.chipCertificate.isPrint,
          user: services.documentation.chipCertificate.user,
        },
        senasaDocuments: {
          hasServiceIncluded:
            documentation?.senasaDocuments?.hasServiceIncluded ??
            services.documentation.senasaDocuments.hasServiceIncluded,
          expectedDate:
            documentation?.senasaDocuments?.expectedDate ??
            services.documentation.senasaDocuments.expectedDate,
          isRequired:
            documentation?.senasaDocuments?.isRequired ??
            services.documentation.senasaDocuments.isRequired,
          executionDate: services.documentation.senasaDocuments.executionDate,
          isApplied: services.documentation.senasaDocuments.isApplied,
          resultDate: services.documentation.senasaDocuments.resultDate,
          observation: services.documentation.senasaDocuments.observation,
          isPrint: services.documentation.senasaDocuments.isPrint,
          user: services.documentation.senasaDocuments.user,
        },
        rabiesSeroLogicalTest: {
          hasServiceIncluded:
            documentation?.rabiesSeroLogicalTest?.hasServiceIncluded ??
            services.documentation.rabiesSeroLogicalTest.hasServiceIncluded,
          expectedDate:
            documentation?.rabiesSeroLogicalTest?.expectedDate ??
            services.documentation.rabiesSeroLogicalTest.expectedDate,
          isRequired:
            documentation?.rabiesSeroLogicalTest?.isRequired ??
            services.documentation.rabiesSeroLogicalTest.isRequired,
          isApplied: services.documentation.rabiesSeroLogicalTest.isApplied,
          executionDate:
            services.documentation.rabiesSeroLogicalTest.executionDate,
          resultDate: services.documentation.rabiesSeroLogicalTest.resultDate,
          observation: services.documentation.rabiesSeroLogicalTest.observation,
          isPrint: services.documentation.rabiesSeroLogicalTest.isPrint,
          user: services.documentation.rabiesSeroLogicalTest.user,
        },
        importLicense: {
          hasServiceIncluded:
            documentation?.importLicense?.hasServiceIncluded ??
            services.documentation.importLicense.hasServiceIncluded,
          expectedDate:
            documentation?.importLicense?.expectedDate ??
            services.documentation.importLicense.expectedDate,
          isRequired:
            documentation?.importLicense?.isRequired ??
            services.documentation.importLicense.isRequired,
          isApplied: services.documentation.importLicense.isApplied,
          executionDate: services.documentation.importLicense.executionDate,
          resultDate: services.documentation.importLicense.resultDate,
          observation: services.documentation.importLicense.observation,
          isPrint: services.documentation.importLicense.isPrint,
          user: services.documentation.importLicense.user,
        },
        emotionalSupportCertificate: {
          hasServiceIncluded:
            documentation?.emotionalSupportCertificate?.hasServiceIncluded ??
            services.documentation.emotionalSupportCertificate
              .hasServiceIncluded,
          isRequired:
            documentation?.emotionalSupportCertificate?.isRequired ??
            services.documentation.emotionalSupportCertificate.isRequired,
          expectedDate:
            documentation?.emotionalSupportCertificate?.expectedDate ??
            services.documentation.emotionalSupportCertificate.expectedDate,
          isApplied:
            services.documentation.emotionalSupportCertificate.isApplied,
          executionDate:
            services.documentation.emotionalSupportCertificate.executionDate,
          resultDate:
            services.documentation.emotionalSupportCertificate.resultDate,
          observation:
            services.documentation.emotionalSupportCertificate.observation,
          isPrint: services.documentation.emotionalSupportCertificate.isPrint,
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
        observation: travel?.observation ?? services.travel.observation,
      },
    };
  }
}
