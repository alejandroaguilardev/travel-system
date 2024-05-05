import { PayInInstallmentInterface } from './pay-in-installment.interface';
import { StatusInterface } from './status.interface';
import { ContractDetailInterface } from '../../../contract-detail/domain/interfaces/contract-detail.interface';

export interface ContractStatusInterface {
  petTravel: StatusInterface;
  client: StatusInterface;
}

export interface ContractInterface {
  id: string;
  correlative?: number;
  folder: string;
  number: string;
  client: string;
  status: ContractStatusInterface;
  startDate: Date;
  estimatedDate: Date;
  endDate: Date;
  details: ContractDetailInterface[];
  adviser: string;
  price: number;
  payInInstallments?: PayInInstallmentInterface[];
  finishClient?: boolean;
  reasonForCancellation?: string;
  format: string;
  user: string;
}
