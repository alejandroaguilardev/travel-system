import { Uuid, UuidOptional } from '../../../common/domain/value-object';
import { Contract } from '../../domain/contract';
import {
  ContractNumber,
  ContractStatus,
  ContractStartDate,
  ContractEndDate,
  ContractDetails,
} from '../../domain/value-object';

import { ContractCreateRequest } from './contract-create-request';
import { CommandContractDetailCreator } from '../../../contract-detail/application/create/command-contract-detail-creator';
import { ContractDetail } from '../../../contract-detail/domain/contract-detail';

export class CommandContractCreator {
  static execute(data: ContractCreateRequest, userId: string): Contract {
    return new Contract(
      new Uuid(data.id),
      new ContractNumber(data.number),
      new Uuid(data.client),
      new ContractStatus('pending'),
      new ContractStartDate(data.startDate),
      new ContractEndDate(null),
      new ContractDetails([]),
      new UuidOptional(userId),
    );
  }

  static details(
    data: ContractCreateRequest,
    userId: string,
  ): ContractDetail[] {
    return CommandContractDetailCreator.execute(data.details, userId);
  }
}
