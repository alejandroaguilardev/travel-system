import { faker } from '@faker-js/faker';
import {
  ChipContractInterface,
  ContractTopicoInterface,
  ChipReviewContractInterface,
  RabiesReVaccinationContractInterface,
  RabiesVaccinationContractInterface,
  TakingSampleSerologicalTestContractInterface,
  VaccinationContractInterface,
} from '../../../src/contract-detail/domain/interfaces/topico.interface';
import { StringMother } from '../../common/domain/string.mother';
import { UuidMother } from '../../common/domain/uuid-mother';
import { ContractTopico } from '../../../src/contract-detail/domain/value-object/contract-topico';

export class TopicoMother {
  static value(): keyof typeof ContractTopico.keysTopicoObject {
    return ContractTopico.keysTopico[
      faker.number.int({ min: 0, max: ContractTopico.keysTopico.length - 1 })
    ] as keyof typeof ContractTopico.keysTopicoObject;
  }

  static create(
    values?: ContractTopicoInterface,
  ): Partial<ContractTopicoInterface> {
    return (
      values ?? {
        chip: TopicoMother.chip(),
        vaccination: TopicoMother.vaccination(),
        rabiesVaccination: TopicoMother.rabiesVaccination(),
        rabiesReVaccination: TopicoMother.rabiesReVaccination(),
        chipReview: TopicoMother.chipReview(),
        takingSampleSerologicalTest: TopicoMother.takingSampleSerologicalTest(),
      }
    );
  }

  static chip(chip?: ChipContractInterface): ChipContractInterface {
    return (
      chip ?? {
        hasIncluded: faker.datatype.boolean(),
        executed: faker.datatype.boolean(),
        date: faker.date.recent(),
        description: StringMother.create(),
        observation: StringMother.create(),
        user: UuidMother.create(),
      }
    );
  }

  static vaccination(
    vaccination?: VaccinationContractInterface,
  ): ChipContractInterface {
    return (
      vaccination ?? {
        hasIncluded: faker.datatype.boolean(),
        executed: faker.datatype.boolean(),
        date: faker.date.recent(),
        description: StringMother.create(),
        observation: StringMother.create(),
        user: UuidMother.create(),
      }
    );
  }

  static rabiesVaccination(
    rabiesVaccination?: RabiesVaccinationContractInterface,
  ): RabiesVaccinationContractInterface {
    return (
      rabiesVaccination ?? {
        hasIncluded: faker.datatype.boolean(),
        executed: faker.datatype.boolean(),
        date: faker.date.recent(),
        description: StringMother.create(),
        observation: StringMother.create(),
        user: UuidMother.create(),
      }
    );
  }

  static rabiesReVaccination(
    rabiesVaccination?: RabiesReVaccinationContractInterface,
  ): RabiesReVaccinationContractInterface {
    return (
      rabiesVaccination ?? {
        hasIncluded: faker.datatype.boolean(),
        executed: faker.datatype.boolean(),
        date: faker.date.recent(),
        description: StringMother.create(),
        observation: StringMother.create(),
        user: UuidMother.create(),
      }
    );
  }

  static chipReview(
    chipReview?: ChipReviewContractInterface,
  ): ChipReviewContractInterface {
    return (
      chipReview ?? {
        executed: faker.datatype.boolean(),
        date: faker.date.recent(),
        description: StringMother.create(),
        observation: StringMother.create(),
        user: UuidMother.create(),
      }
    );
  }

  static takingSampleSerologicalTest(
    takingSampleSerologicalTest?: TakingSampleSerologicalTestContractInterface,
  ): TakingSampleSerologicalTestContractInterface {
    return (
      takingSampleSerologicalTest ?? {
        hasIncluded: faker.datatype.boolean(),
        executed: faker.datatype.boolean(),
        date: faker.date.recent(),
        description: StringMother.create(),
        observation: StringMother.create(),
        typeSample: StringMother.create(),
        user: UuidMother.create(),
      }
    );
  }
}
