import { ContractDetailInterface } from '../../domain/interfaces/contract-detail.interface';
import { CageInterface } from '../../domain/interfaces/cage.interface';
import { DocumentationInterface } from '../../domain/interfaces/documentation.interface';
import { TypeTravelingType } from '../../domain/interfaces/travel.interface';

export interface ContractDetailCreateRequest
  extends Omit<ContractDetailInterface, 'travel' | 'guideNumber' | 'user'> {
  cage: CageInterface;
  documentation: DocumentationInterface;
  travel: {
    hasServiceIncluded: boolean;
    typeTraveling: TypeTravelingType;
    hasServiceAccompanied: boolean;
  };
}
