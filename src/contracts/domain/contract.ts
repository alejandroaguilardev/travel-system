import { Uuid } from '../../common/domain/value-object/uuid';
import { ContractDefinition } from './interfaces/contract';
import { StatusDefinition } from './interfaces/status';
import { ContractEndDate } from './value-object/contract-end-date';
import { ContractGuideNumber } from './value-object/contract-guide-number';
import { ContractNumber } from './value-object/contract-number';
import { ContractPets } from './value-object/contract-pets';
import { ContractServices } from './value-object/contract-services';
import { ContractStartDate } from './value-object/contract-start-date';
import { ContractStatus } from './value-object/contract-status';
import { ErrorInvalidadArgument } from '../../common/domain/errors/error-invalid-argument';

export class Contract {
  constructor(
    readonly id: Uuid,
    readonly number: ContractNumber,
    readonly client: Uuid,
    readonly status: ContractStatus,
    readonly startDate: ContractStartDate,
    public endDate: ContractEndDate,
    readonly services: ContractServices,
    readonly guideNumber: ContractGuideNumber,
    readonly pets: ContractPets,
  ) {}

  toJson(): ContractDefinition {
    return {
      id: this.id.value,
      number: this.number.value,
      client: this.client.value,
      status: this.status.value as StatusDefinition,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      services: this.services.toJson(),
      guideNumber: this.guideNumber.value,
      pets: this.pets.toJson(),
    };
  }

  static statusError(status: StatusDefinition) {
    if (
      status === 'canceled' ||
      status === 'none' ||
      status === 'suspended' ||
      status === 'completed'
    ) {
      throw new ErrorInvalidadArgument('El contrato se encuentra ' + status);
    }
  }

  static establishedStatus(contract: ContractDefinition) {
    let count = 0;
    Object.keys(contract.services).forEach((key) => {
      if (contract.services[key].status === 'completed') {
        ++count;
      }
    });

    if (count === 3) {
      contract.status = 'completed';
    } else if (count > 0) {
      contract.status = 'in-process';
    } else {
      contract.status = 'pending';
    }

    return contract;
  }

  setEndDate(date: ContractEndDate) {
    this.endDate = date;
  }
}
