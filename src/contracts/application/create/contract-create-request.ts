import { ContractInterface } from '../../domain/interfaces/contract.interface';
import { CageInterface } from '../../domain/interfaces/cage.interface';
import { DocumentationInterface } from '../../domain/interfaces/documentation.interface';
import { TypeTravelingType } from '../../domain/interfaces/travel.interface';

export interface ContractCreateRequest
  extends Omit<
    ContractInterface,
    'status' | 'endDate' | 'guideNumber' | 'services' | 'user'
  > {
  cage: CageInterface;
  documentation: DocumentationInterface;
  travel: {
    hasServiceIncluded: boolean;
    typeTraveling: TypeTravelingType;
    hasServiceAccompanied: boolean;
  };
}
