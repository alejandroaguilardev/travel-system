import { Uuid, UuidOptional } from '../../../common/domain/value-object';
import { ContractInterface } from '../../domain/interfaces';
import { Contract } from '../../domain/contract';
import {
  ContractNumber,
  ContractStatus,
  ContractStartDate,
  ContractEndDate,
  ContractDetails,
} from '../../domain/value-object';

export class CommandContractUpdater {
  static execute(
    contract: ContractInterface,
    data?: ContractInterface,
  ): Contract {
    return new Contract(
      new Uuid(contract.id),
      new ContractNumber(data?.number ?? contract.number),
      new Uuid(data?.client ?? contract.client),
      new ContractStatus(contract.status),
      new ContractStartDate(data?.startDate ?? contract.startDate),
      new ContractEndDate(contract.endDate),
      new ContractDetails(data?.details ?? contract.details),
      new UuidOptional(data?.user ?? contract.user),
    );
  }
}
