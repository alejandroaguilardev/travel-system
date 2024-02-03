import { CageInterface } from './cage.interface';
import { DocumentationInterface } from './documentation.interface';
import { TravelInterface } from './travel.interface';

export interface ServicesInterface {
  documentation: DocumentationInterface;
  cage: CageInterface;
  travel: TravelInterface;
}
