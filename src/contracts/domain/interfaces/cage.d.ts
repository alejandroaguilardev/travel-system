import { StatusDefinition } from './status';

export interface CageDefinition {
  status: StatusDefinition;
  hasServiceIncluded: boolean;
  swornDeclaration: boolean;
  chosen: {
    modelCage: string;
    typeCage: string;
  };
  recommendation: string;
}
