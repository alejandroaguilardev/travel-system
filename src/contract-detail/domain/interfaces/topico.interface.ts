import { StatusInterface } from "./status.interface";

export interface ChipContractInterface {
  hasIncluded: boolean;
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  doctorProvince: string;
  user: string;
}

export interface VaccinationContractInterface {
  hasIncluded: boolean;
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  doctorProvince: string;
  user: string;
}

export interface RabiesVaccinationContractInterface {
  hasIncluded: boolean;
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  doctorProvince: string;
  user: string;
}

export interface RabiesReVaccinationContractInterface {
  hasIncluded: boolean;
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  doctorProvince: string;
  user: string;
}

export interface ChipReviewContractInterface {
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  doctorProvince: string;
  user: string;
}

export interface TakingSampleSerologicalTestContractInterface {
  hasIncluded: boolean;
  executed: boolean;
  date: Date;
  description: string;
  observation: string;
  typeSample: string;
  doctorProvince: string;
  user: string;
}

export interface ContractTopicoInterface {
  chip: ChipContractInterface;
  vaccination: VaccinationContractInterface;
  rabiesVaccination: RabiesVaccinationContractInterface;
  rabiesReVaccination: RabiesReVaccinationContractInterface;
  chipReview: ChipReviewContractInterface;
  takingSampleSerologicalTest: TakingSampleSerologicalTestContractInterface;
  status?: StatusInterface;
}
