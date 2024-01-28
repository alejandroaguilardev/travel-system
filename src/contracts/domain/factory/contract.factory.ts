import { ContractCreateRequest } from '../../application/create/contract-create-request';
import { Contract } from '../contract';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractNumber } from '../value-object/contract-number';
import { ContractPets } from '../value-object/contract-pets';
import { ContractStartDate } from '../value-object/contract-start-date';
import { ContractStatus } from '../value-object/contract-status';
import { ContractEndDate } from '../value-object/contract-end-date';
import { ContractServices } from '../value-object/contract-services';
import { ContractGuideNumber } from '../value-object/contract-guide-number';
import { ContractDocumentationFactory } from './contract-documentation.factory';
import { ContractCageFactory } from './cage.factory';
import { ContractTravelFactory } from './travel.factory';
import { ContractDefinition } from '../interfaces/contract';
import { ContractUpdaterRequest } from '../../application/update/contract-updater-request';
import { ServicesDefinition } from '../interfaces/services';

export class ContractFactory {
  static converter(data: ContractDefinition): Contract {
    return new Contract(
      new Uuid(data.id),
      new ContractNumber(data.number),
      new Uuid(data.client),
      new ContractStatus(data.status),
      new ContractStartDate(data.startDate),
      new ContractEndDate(data.endDate),
      new ContractServices(
        ContractDocumentationFactory.create(data.services.documentation),
        ContractCageFactory.create(data.services.cage),
        ContractTravelFactory.converter(data.services.travel),
      ),
      new ContractGuideNumber(data.guideNumber),
      new ContractPets(data.pets),
    );
  }

  static create(data: ContractCreateRequest): Contract {
    return new Contract(
      new Uuid(data.id),
      new ContractNumber(data.number),
      new Uuid(data.client),
      new ContractStatus('pending'),
      new ContractStartDate(data.startDate),
      new ContractEndDate(null),
      new ContractServices(
        ContractDocumentationFactory.create(data.documentation),
        ContractCageFactory.create(data.cage),
        ContractTravelFactory.create(
          data.travel.hasServiceIncluded,
          data.travel.typeTraveling,
        ),
      ),
      new ContractGuideNumber(''),
      new ContractPets(data.pets),
    );
  }

  static update(
    data: ContractUpdaterRequest,
    contract: ContractDefinition,
  ): Contract {
    const services = ContractFactory.servicesUpdate(data, contract);
    return new Contract(
      new Uuid(contract.id),
      new ContractNumber(data?.number ?? contract.number),
      new Uuid(data?.client ?? contract.client),
      new ContractStatus(contract.status),
      new ContractStartDate(data?.startDate ?? contract.startDate),
      new ContractEndDate(contract.endDate),
      new ContractServices(
        ContractDocumentationFactory.create(services.documentation),
        ContractCageFactory.create(services.cage),
        ContractTravelFactory.converter(services.travel),
      ),
      new ContractGuideNumber(contract.guideNumber),
      new ContractPets(data?.pets ?? contract.pets),
    );
  }

  private static servicesUpdate(
    data: ContractUpdaterRequest,
    contract: ContractDefinition,
  ): ServicesDefinition {
    const { cage, documentation, travel } = data;
    const { services } = contract;
    return {
      cage: {
        status: services.cage.status,
        hasServiceIncluded:
          cage?.hasServiceIncluded ?? services.cage.hasServiceIncluded,
        swornDeclaration: services.cage.swornDeclaration,
        chosen: {
          modelCage:
            cage?.chosen?.modelCage ?? services.cage.chosen?.modelCage ?? '',
          dimensionsCage:
            cage?.chosen?.dimensionsCage ??
            services.cage.chosen?.dimensionsCage ??
            '',
          typeCage:
            cage?.chosen?.typeCage ?? services.cage.chosen?.typeCage ?? '',
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
        },
        healthCertificate: {
          hasServiceIncluded:
            documentation?.healthCertificate?.hasServiceIncluded ??
            services.documentation.healthCertificate.hasServiceIncluded,
          isApplied: services.documentation.healthCertificate.isApplied,
        },
        chipCertificate: {
          hasServiceIncluded:
            documentation?.chipCertificate?.hasServiceIncluded ??
            services.documentation.chipCertificate.hasServiceIncluded,
          isApplied: services.documentation.chipCertificate.isApplied,
        },
        senasaDocuments: {
          hasServiceIncluded:
            documentation?.senasaDocuments?.hasServiceIncluded ??
            services.documentation.senasaDocuments.hasServiceIncluded,
          isApplied: services.documentation.senasaDocuments.isApplied,
        },
        rabiesSeroLogicalTest: {
          hasServiceIncluded:
            documentation?.rabiesSeroLogicalTest?.hasServiceIncluded ??
            services.documentation.rabiesSeroLogicalTest.hasServiceIncluded,
          isApplied: services.documentation.rabiesSeroLogicalTest.isApplied,
        },
        importLicense: {
          hasServiceIncluded:
            documentation?.importLicense?.hasServiceIncluded ??
            services.documentation.importLicense.hasServiceIncluded,
          isApplied: services.documentation.importLicense.isApplied,
        },
        emotionalSupportCertificate: {
          hasServiceIncluded:
            documentation?.emotionalSupportCertificate?.hasServiceIncluded ??
            services.documentation.emotionalSupportCertificate
              .hasServiceIncluded,
          isApplied:
            services.documentation.emotionalSupportCertificate.isApplied,
        },
      },
      travel: {
        hasServiceIncluded:
          travel?.hasServiceIncluded ??
          contract.services.travel.hasServiceIncluded,
        typeTraveling:
          travel?.typeTraveling ?? contract.services.travel.typeTraveling,
        airlineReservation: services.travel.airlineReservation,
        petPerCharge: services.travel.petPerCharge,
        status: services.travel.status,
      },
    };
  }
}
