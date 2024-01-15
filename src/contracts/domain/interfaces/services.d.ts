import { CageDefinition } from './cage';
import { DocumentationDefinition } from './documentation';
import { TravelDefinition } from './travel';

interface ServicesDefinition {
  documentation: DocumentationDefinition;
  cage: CageDefinition;
  travel: TravelDefinition;
}
