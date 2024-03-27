import { Repository } from '../../common/domain/repository';
import { ContractDetail } from './contract-detail';
import { Uuid } from '../../common/domain/value-object/uuid';
import { ContractDetailResponse } from '../application/response/contract-detail.response';
import {
  ContractTravel,
  ContractCage,
  ContractDocumentation,
} from './value-object';
import { ContractTopico } from './value-object/contract-topico';

export interface ContractDetailRepository extends Repository<ContractDetail> {
  searchByIdWithPet(id: Uuid): Promise<ContractDetailResponse>;
  updateDocumentation(
    contractDetailId: Uuid,
    documentation: ContractDocumentation,
  ): Promise<void>;
  updateCage(contractDetailId: Uuid, cage: ContractCage): Promise<void>;
  updateTravel(contractDetailId: Uuid, travel: ContractTravel): Promise<void>;
  updateTopico(
    contractDetailId: Uuid,
    topico: Partial<ContractTopico>,
  ): Promise<void>;
}
