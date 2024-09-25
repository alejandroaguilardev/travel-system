import { RabiesReVaccinationContractInterface } from '../../interfaces/topico.interface';
import { TopicoDate } from './topico-date';
import { TopicoDescription } from './topico-description';
import { TopicoExecuted } from './topico-executed';
import { UuidOptional } from '../../../../common/domain/value-object/uuid-optional-value-object';
import { TopicoObservation } from './topico-observation';
import { TopicoHasIncluded } from './topico-has-included';
import { TopicoDoctorProvince } from './topico-doctor-province';

export class TopicoRabiesReVaccination {
  constructor(
    readonly hasIncluded: TopicoHasIncluded,
    readonly executed: TopicoExecuted,
    readonly date: TopicoDate,
    readonly description: TopicoDescription,
    readonly observation: TopicoObservation,
    readonly doctorProvince: TopicoDoctorProvince,
    readonly user: UuidOptional,
  ) { }

  toJson(): RabiesReVaccinationContractInterface {
    return {
      hasIncluded: this.hasIncluded.value,
      executed: this.executed.value,
      date: this.date.value,
      description: this.description.value,
      observation: this.observation.value,
      doctorProvince: this.doctorProvince.value,
      user: this.user.value,
    };
  }
}
