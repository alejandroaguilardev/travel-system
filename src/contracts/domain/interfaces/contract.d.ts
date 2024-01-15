import { ServicesDefinition } from './services';
import { StatusDefinition } from './status';

export interface ContractDefinition {
  id: string;
  number: string;
  client: string;
  status: StatusDefinition;
  startDate: Date;
  endDate: Date;
  services: ServicesDefinition;
  guideNumber: string;
  pets: string[];
}
