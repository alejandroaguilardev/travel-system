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

export class ContractFactory {
  static create(data: ContractCreateRequest): Contract {
    return new Contract(
      new Uuid(data.id),
      new ContractNumber(data.number),
      new Uuid(data.client),
      new ContractStatus(ContractStatus.status.pending),
      new ContractStartDate(data.startDate),
      new ContractEndDate(null),
      new ContractServices(
        ContractDocumentationFactory.create(
          data.documentation.hasServiceIncluded,
        ),
        ContractCageFactory.create(data.cage.hasServiceIncluded),
        ContractTravelFactory.create(
          data.travel.hasServiceIncluded,
          data.travel.travelingWithPet,
        ),
      ),
      new ContractGuideNumber(''),
      new ContractPets(data.pets),
    );
  }

  static update(data: ContractUpdaterRequest, oldContract: Contract): Contract {
    const contract = new Contract(
      oldContract.id,
      data?.number ? new ContractNumber(data.number) : oldContract.number,
      data?.client ? new Uuid(data.client) : oldContract.client,
      oldContract.status,
      data?.startDate
        ? new ContractStartDate(data.startDate)
        : oldContract.startDate,
      oldContract.endDate,
      oldContract.services,
      oldContract.guideNumber,
      data?.pets ? new ContractPets(data.pets) : oldContract.pets,
    );

    if (data?.documentation?.hasServiceIncluded) {
      contract.services.documentation.setHasServiceIncluded(true);
    }

    if (data?.cage?.hasServiceIncluded) {
      contract.services.cage.setHasServiceIncluded(true);
    }

    if (data?.travel?.hasServiceIncluded) {
      contract.services.travel.setHasServiceIncluded(true);
    }
    if (data?.travel?.travelingWithPet) {
      contract.services.travel.setTravelingWithPet(true);
    }

    return contract;
  }

  static converter(data: ContractDefinition): Contract {
    return new Contract(
      new Uuid(data.id),
      new ContractNumber(data.number),
      new Uuid(data.client),
      new ContractStatus(data.status),
      new ContractStartDate(data.startDate),
      new ContractEndDate(data.endDate),
      new ContractServices(
        ContractDocumentationFactory.converter(data.services.documentation),
        ContractCageFactory.converter(data.services.cage),
        ContractTravelFactory.converter(data.services.travel),
      ),
      new ContractGuideNumber(data.guideNumber),
      new ContractPets(data.pets),
    );
  }
}
