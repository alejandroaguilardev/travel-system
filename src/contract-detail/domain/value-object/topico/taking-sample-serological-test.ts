import { TakingSampleSerologicalTestContractInterface } from '../../interfaces/topico.interface';
import { TopicoDate } from './topico-date';
import { TopicoDescription } from './topico-description';
import { TopicoExecuted } from './topico-executed';
import { UuidOptional } from '../../../../common/domain/value-object/uuid-optional-value-object';
import { TopicoObservation } from './topico-observation';
import { TopicoTakingSampleType } from './topico-taking-sample-type';

export class TakingSampleSerologicalTest {
  constructor(
    readonly executed: TopicoExecuted,
    readonly date: TopicoDate,
    readonly description: TopicoDescription,
    readonly observation: TopicoObservation,
    readonly typeSample: TopicoTakingSampleType,

    readonly user: UuidOptional,
  ) {}

  toJson(): TakingSampleSerologicalTestContractInterface {
    return {
      executed: this.executed.value,
      date: this.date.value,
      description: this.description.value,
      observation: this.observation.value,
      typeSample: this.typeSample.value,
      user: this.user.value,
    };
  }
}
