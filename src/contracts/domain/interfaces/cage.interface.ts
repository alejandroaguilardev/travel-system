import { StatusInterface } from './status.interface';

export interface CageChosenInterface {
  modelCage: string;
  dimensionsCage: string;
  typeCage: string;
  user?: string;
}
export interface CageInterface {
  status: StatusInterface;
  hasServiceIncluded: boolean;
  swornDeclaration: boolean;
  chosen: CageChosenInterface;
  recommendation: string;
}
