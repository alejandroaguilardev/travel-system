import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import {
  ContractDetailPetDetailUpdater,
  ContractDetailPetUpdaterRequest,
} from '../../application/pet/contract-detail-pet-updater-request';

class ContractDetailPetUpdater {
  @IsUUID()
  id: string;
  @IsUUID()
  pet: string;
}

export class PetDetailDto implements ContractDetailPetUpdaterRequest {
  @Type(() => ContractDetailPetUpdater)
  @ValidateNested()
  details: ContractDetailPetDetailUpdater[];
}
