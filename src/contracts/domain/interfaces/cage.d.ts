import { StatusDefinition } from './status';

export interface CageChosen {
  modelCage: string;
  dimensionsCage: string;
  typeCage: string;
}
export interface CageDefinition {
  status: StatusDefinition;
  hasServiceIncluded: boolean;
  swornDeclaration: boolean;
  chosen: CageChosen;
  recommendation: string;
}
