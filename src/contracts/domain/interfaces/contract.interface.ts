import { StatusInterface } from './status.interface';

export interface ContractInterface {
  id: string;
  number: string;
  client: string;
  status: StatusInterface;
  startDate: Date;
  endDate: Date;
  details: string[];
  user: string;
}
