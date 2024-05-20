import { ErrorRepository } from '../../domain/incident-repository';
import { Incident } from '../../domain/incidents';

export class CreateIncident {
  constructor(private readonly repository: ErrorRepository) {}

  execute(incident: Incident) {
    this.repository.save(incident);
  }
}
