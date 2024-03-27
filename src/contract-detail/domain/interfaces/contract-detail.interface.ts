import { CageInterface } from './cage.interface';
import { DocumentationInterface } from './documentation.interface';
import { ContractTopicoInterface } from './topico.interface';
import { TravelInterface } from './travel.interface';

export interface ContractDetailInterface {
  id: string;
  documentation: DocumentationInterface;
  cage: CageInterface;
  travel: TravelInterface;
  guideNumber: string;
  pet?: string;
  user: string;
  topico?: ContractTopicoInterface;
}
