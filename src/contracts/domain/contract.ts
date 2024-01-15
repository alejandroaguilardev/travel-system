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

export class Contract {
  constructor(
    readonly id: Uuid,
    readonly number: ContractNumber,
    readonly client: Uuid,
    readonly status: ContractStatus,
    readonly startDate: ContractStartDate,
    readonly endDate: ContractEndDate,
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
}
