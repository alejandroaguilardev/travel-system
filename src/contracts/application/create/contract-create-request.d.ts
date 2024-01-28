import { ContractDefinition } from '../../domain/interfaces/contract';
import { CageDefinition } from '../../domain/interfaces/cage';
import { DocumentationDefinition } from '../../domain/interfaces/documentation';
import { TypeTraveling } from '../../domain/interfaces/travel';

export interface ContractCreateRequest
  extends Omit<
    ContractDefinition,
    'status' | 'endDate' | 'guideNumber' | 'services'
  > {
  cage: CageDefinition;
  documentation: DocumentationDefinition;
  travel: {
    hasServiceIncluded: boolean;
    typeTraveling: TypeTraveling;
  };
}
