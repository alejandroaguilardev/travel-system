import { ServicesInterface } from './services.interface';
import { StatusInterface } from './status.interface';

export interface ContractInterface {
  id: string;
  number: string;
  client: string;
  status: StatusInterface;
  startDate: Date;
  endDate: Date;
  services: ServicesInterface;
  guideNumber: string;
  pets: string[];
  user: string;
}
