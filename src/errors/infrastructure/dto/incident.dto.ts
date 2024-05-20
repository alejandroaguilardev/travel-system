import { IsString, IsUUID } from 'class-validator';
import { CreateRequestIncident } from '../../application/create/create-request-incidennt';

export class IncidentDto implements CreateRequestIncident {
  @IsUUID()
  id: string;
  @IsString()
  name: string;
  @IsString()
  body: string;
  @IsString()
  error: string;
}
