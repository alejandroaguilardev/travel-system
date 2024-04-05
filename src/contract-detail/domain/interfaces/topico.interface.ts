export interface ChipContractInterface {
  hasIncluded: boolean;
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  user: string;
}

export interface VaccinationContractInterface {
  hasIncluded: boolean;
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  user: string;
}

export interface RabiesVaccinationContractInterface {
  hasIncluded: boolean;
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  user: string;
}

export interface RabiesReVaccinationContractInterface {
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  user: string;
}

export interface ChipReviewContractInterface {
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  user: string;
}

export interface TakingSampleSerologicalTestContractInterface {
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  typeSample: string;
  user: string;
}

export interface ContractTopicoInterface {
  chip: ChipContractInterface;
  vaccination: VaccinationContractInterface;
  rabiesVaccination: RabiesVaccinationContractInterface;
  rabiesReVaccination: RabiesReVaccinationContractInterface;
  chipReview: ChipReviewContractInterface;
  takingSampleSerologicalTest: TakingSampleSerologicalTestContractInterface;
}
