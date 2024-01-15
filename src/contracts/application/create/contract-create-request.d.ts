import { ContractDefinition } from '../../domain/interfaces/contract';

export interface ContractCreateRequest
  extends Omit<
    ContractDefinition,
    'status' | 'endDate' | 'guideNumber' | 'services'
  > {
  documentation: {
    hasServiceIncluded: boolean;
  };
  cage: {
    hasServiceIncluded: boolean;
  };
  travel: {
    hasServiceIncluded: boolean;
    travelingWithPet: boolean;
  };
}
