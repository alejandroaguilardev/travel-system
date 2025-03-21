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
import { TopicoDoctorProvince } from '../../../domain/value-object/topico/topico-doctor-province';

export class CommandContractTopico {
  static execute(
    contractTopicoInterface?: ContractTopicoInterface,
    data?: ContractTopicoInterface,
    userId?: string,
  ): ContractTopico {
    return new ContractTopico(
      CommandContractTopico.chip(data?.chip ?? contractTopicoInterface?.chip, userId),
      CommandContractTopico.vaccination(
        data?.vaccination ?? contractTopicoInterface?.vaccination,
        userId,
      ),
      CommandContractTopico.rabiesVaccination(
        data?.rabiesVaccination ?? contractTopicoInterface?.rabiesVaccination,
        userId,
      ),
      CommandContractTopico.rabiesReVaccination(
        data?.rabiesReVaccination ?? contractTopicoInterface?.rabiesReVaccination,
        userId,
      ),
      CommandContractTopico.chipReview(
        data?.chipReview ?? contractTopicoInterface?.chipReview,
        userId,
      ),
      CommandContractTopico.takingSampleSerologicalTest(
        data?.takingSampleSerologicalTest ?? contractTopicoInterface?.takingSampleSerologicalTest,
        userId,
      ),
      new ContractStatusDetail(
        data?.status ?? contractTopicoInterface?.status ?? 'pending',
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
      new TopicoDoctorProvince(chip?.doctorProvince ?? ''),
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
      new TopicoDoctorProvince(vaccination?.doctorProvince ?? ''),
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
      new TopicoDoctorProvince(rabiesVaccination?.doctorProvince ?? ''),
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
      new TopicoDoctorProvince(rabiesReVaccination?.doctorProvince ?? ''),
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
      new TopicoDoctorProvince(chipReview?.doctorProvince ?? ''),
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
      new TopicoDoctorProvince(takingSampleSerologicalTest?.doctorProvince ?? ''),
      new TopicoTakingSampleType(takingSampleSerologicalTest?.typeSample ?? ''),
      new UuidOptional(takingSampleSerologicalTest?.user ?? userId ?? ''),
    );
  }
}
