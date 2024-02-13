import { Repository } from '../../common/domain/repository';
import { ContractDetail } from './contract-detail';
import { Uuid } from '../../common/domain/value-object/uuid';
import {
  ContractTravel,
  ContractCage,
  ContractDocumentation,
} from './value-object';

export interface ContractDetailRepository extends Repository<ContractDetail> {
  updateDocumentation(
    contractDetailId: Uuid,
    documentation: ContractDocumentation,
  ): Promise<void>;
  updateCage(contractDetailId: Uuid, cage: ContractCage): Promise<void>;
  updateTravel(contractDetailId: Uuid, travel: ContractTravel): Promise<void>;
}
