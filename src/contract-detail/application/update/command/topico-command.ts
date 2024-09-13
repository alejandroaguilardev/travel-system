import { TopicoHasIncluded } from '../../../domain/value-object/topico/topico-has-included';
import {
  ChipContractInterface,
  ChipReviewContractInterface,
  ContractTopicoInterface,
  RabiesReVaccinationContractInterface,
  TakingSampleSerologicalTestContractInterface,
  VaccinationContractInterface,
} from '../../../domain/interfaces/topico.interface';
import { ContractTopico } from '../../../domain/value-object/contract-topico';
import { TopicoChip } from '../../../domain/value-object/topico/topico-chip';
import { TopicoExecuted } from '../../../domain/value-object/topico/topico-executed';
import { TopicoDate } from '../../../domain/value-object/topico/topico-date';
import { TopicoDescription } from '../../../domain/value-object/topico/topico-description';
import { TopicoVaccination } from '../../../domain/value-object/topico/topico-vaccination';
import { TopicoRabiesVaccination } from '../../../domain/value-object/topico/topico-rabies-vaccination';
import { TopicoRabiesReVaccination } from '../../../domain/value-object/topico/topico-rabies-re-vaccination';
import { TopicoReviewChip } from '../../../domain/value-object/topico/topico-review-chip';
import { TakingSampleSerologicalTest } from '../../../domain/value-object/topico/taking-sample-serological-test';
import { TopicoObservation } from '../../../domain/value-object/topico/topico-observation';
import { ContractStatusDetail, UuidOptional } from '../../../../common/domain/value-object';
import { RabiesVaccinationContractInterface } from '../../../domain/interfaces/topico.interface';
import { TopicoTakingSampleType } from '../../../domain/value-object/topico/topico-taking-sample-type';

export class CommandContractTopico {
  static execute(
    contractTopicoInterface?: ContractTopicoInterface,
    userId?: string,
  ): ContractTopico {
    return new ContractTopico(
      CommandContractTopico.chip(contractTopicoInterface?.chip, userId),
      CommandContractTopico.vaccination(
        contractTopicoInterface?.vaccination,
        userId,
      ),
      CommandContractTopico.rabiesVaccination(
        contractTopicoInterface?.rabiesVaccination,
        userId,
      ),
      CommandContractTopico.rabiesReVaccination(
        contractTopicoInterface?.rabiesReVaccination,
        userId,
      ),
      CommandContractTopico.chipReview(
        contractTopicoInterface?.chipReview,
        userId,
      ),
      CommandContractTopico.takingSampleSerologicalTest(
        contractTopicoInterface?.takingSampleSerologicalTest,
        userId,
      ),
      new ContractStatusDetail(
        contractTopicoInterface?.status ?? 'pending',
      ),
    );
  }

  static chip(chip?: ChipContractInterface, userId?: string): TopicoChip {
    return new TopicoChip(
      new TopicoHasIncluded(chip?.hasIncluded ?? false),
      new TopicoExecuted(chip?.executed ?? false),
      new TopicoDate(chip?.date ?? null),
      new TopicoDescription(chip?.description ?? ''),
      new TopicoObservation(chip?.observation ?? ''),
      new UuidOptional(chip?.user ?? userId ?? ''),
    );
  }

  static vaccination(
    vaccination?: VaccinationContractInterface,
    userId?: string,
  ): TopicoVaccination {
    return new TopicoVaccination(
      new TopicoHasIncluded(vaccination?.hasIncluded ?? false),
      new TopicoExecuted(vaccination?.executed ?? false),
      new TopicoDate(vaccination?.date ?? null),
      new TopicoDescription(vaccination?.description ?? ''),
      new TopicoObservation(vaccination?.observation ?? ''),
      new UuidOptional(vaccination?.user ?? userId ?? ''),
    );
  }

  static rabiesVaccination(
    rabiesVaccination?: RabiesVaccinationContractInterface,
    userId?: string,
  ): TopicoRabiesVaccination {
    return new TopicoRabiesVaccination(
      new TopicoHasIncluded(rabiesVaccination?.hasIncluded ?? false),
      new TopicoExecuted(rabiesVaccination?.executed ?? false),
      new TopicoDate(rabiesVaccination?.date ?? null),
      new TopicoDescription(rabiesVaccination?.description ?? ''),
      new TopicoObservation(rabiesVaccination?.observation ?? ''),
      new UuidOptional(rabiesVaccination?.user ?? userId ?? ''),
    );
  }

  static rabiesReVaccination(
    rabiesReVaccination?: RabiesReVaccinationContractInterface,
    userId?: string,
  ): TopicoRabiesReVaccination {
    return new TopicoRabiesReVaccination(
      new TopicoHasIncluded(rabiesReVaccination?.hasIncluded ?? false),
      new TopicoExecuted(rabiesReVaccination?.executed ?? false),
      new TopicoDate(rabiesReVaccination?.date ?? null),
      new TopicoDescription(rabiesReVaccination?.description ?? ''),
      new TopicoObservation(rabiesReVaccination?.observation ?? ''),
      new UuidOptional(rabiesReVaccination?.user ?? userId ?? ''),
    );
  }

  static chipReview(
    chipReview?: ChipReviewContractInterface,
    userId?: string,
  ): TopicoReviewChip {
    return new TopicoReviewChip(
      new TopicoExecuted(chipReview?.executed ?? false),
      new TopicoDate(chipReview?.date ?? null),
      new TopicoDescription(chipReview?.description ?? ''),
      new TopicoObservation(chipReview?.observation ?? ''),
      new UuidOptional(chipReview?.user ?? userId ?? ''),
    );
  }

  static takingSampleSerologicalTest(
    takingSampleSerologicalTest?: TakingSampleSerologicalTestContractInterface,
    userId?: string,
  ): TakingSampleSerologicalTest {
    return new TakingSampleSerologicalTest(
      new TopicoHasIncluded(takingSampleSerologicalTest?.hasIncluded ?? false),
      new TopicoExecuted(takingSampleSerologicalTest?.executed ?? false),
      new TopicoDate(takingSampleSerologicalTest?.date ?? null),
      new TopicoDescription(takingSampleSerologicalTest?.description ?? ''),
      new TopicoObservation(takingSampleSerologicalTest?.observation ?? ''),
      new TopicoTakingSampleType(takingSampleSerologicalTest?.typeSample ?? ''),
      new UuidOptional(takingSampleSerologicalTest?.user ?? userId ?? ''),
    );
  }
}
