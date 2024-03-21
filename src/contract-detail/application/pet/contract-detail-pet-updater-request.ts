export interface ContractDetailPetDetailUpdater {
  id: string;
  pet: string;
}

export interface ContractDetailPetUpdaterRequest {
  details: ContractDetailPetDetailUpdater[];
}
