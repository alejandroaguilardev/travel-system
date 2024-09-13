import { StatusInterface } from '../interfaces';
import { ContractTopicoInterface } from '../interfaces/topico.interface';
import { TakingSampleSerologicalTest } from './topico/taking-sample-serological-test';
import { TopicoChip } from './topico/topico-chip';
import { TopicoRabiesReVaccination } from './topico/topico-rabies-re-vaccination';
import { TopicoRabiesVaccination } from './topico/topico-rabies-vaccination';
import { TopicoReviewChip } from './topico/topico-review-chip';
import { TopicoVaccination } from './topico/topico-vaccination';
import { ContractStatusDetail } from '../../../common/domain/value-object/contract-status-detail';

export class ContractTopico {
  static keysTopico = [
    'chip',
    'vaccination',
    'rabiesVaccination',
    'rabiesReVaccination',
    'chipReview',
    'takingSampleSerologicalTest',
  ];
  static keysTopicoObject = {
    chip: 'chip',
    vaccination: 'vaccination',
    rabiesVaccination: 'rabiesVaccination',
    rabiesReVaccination: 'rabiesReVaccination',
    chipReview: 'chipReview',
    takingSampleSerologicalTest: 'takingSampleSerologicalTest',
  };

  constructor(
    readonly chip: TopicoChip,
    readonly vaccination: TopicoVaccination,
    readonly rabiesVaccination: TopicoRabiesVaccination,
    readonly rabiesReVaccination: TopicoRabiesReVaccination,
    readonly chipReview: TopicoReviewChip,
    readonly takingSampleSerologicalTest: TakingSampleSerologicalTest,
    public status: ContractStatusDetail,
  ) { }

  toJson(): ContractTopicoInterface {
    return {
      chip: this.chip.toJson(),
      vaccination: this.vaccination.toJson(),
      rabiesVaccination: this.rabiesVaccination.toJson(),
      rabiesReVaccination: this.rabiesReVaccination.toJson(),
      chipReview: this.chipReview.toJson(),
      takingSampleSerologicalTest: this.takingSampleSerologicalTest.toJson(),
      status: this.status.value as StatusInterface,
    };
  }

  setStatus(status: StatusInterface): void {
    this.status = new ContractStatusDetail(status);
  }

  documentationIsApplied(data: ContractTopicoInterface): StatusInterface {
    let isRequired = 0;
    let executed = 0;
    Object.keys(data).forEach((key) => {
      if (data[key]?.hasIncluded) {
        ++isRequired;
      }
      if (data[key]?.executed) {
        ++executed;
      }

    });

    if (isRequired >= executed) {
      return 'completed';
    } else if (executed > 0) {
      return 'in-process';
    } else {
      return 'pending';
    }
  }

}
