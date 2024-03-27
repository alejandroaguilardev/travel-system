import { RabiesReVaccinationContractInterface } from '../../interfaces/topico.interface';
import { TopicoDate } from './topico-date';
import { TopicoDescription } from './topico-description';
import { TopicoExecuted } from './topico-executed';
import { UuidOptional } from '../../../../common/domain/value-object/uuid-optional-value-object';
import { TopicoObservation } from './topico-observation';

export class TopicoRabiesReVaccination {
  constructor(
    readonly executed: TopicoExecuted,
    readonly date: TopicoDate,
    readonly description: TopicoDescription,
    readonly observation: TopicoObservation,
    readonly user: UuidOptional,
  ) {}

  toJson(): RabiesReVaccinationContractInterface {
    return {
      executed: this.executed.value,
      date: this.date.value,
      description: this.description.value,
      observation: this.observation.value,
      user: this.user.value,
    };
  }
}
