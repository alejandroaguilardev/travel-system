import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { ContractDetailModel } from '../schema/contract-detail.schema';
import { ContractDetail } from '../../domain/contract-detail';
import { Uuid } from '../../../common/domain/value-object/uuid';
import {
  ContractTravel,
  ContractCage,
  ContractDocumentation,
} from '../../domain/value-object';

@Injectable()
export class MongoContractDetailRepository
  extends MongoRepository<ContractDetailModel, ContractDetail>
  implements ContractDetailRepository
{
  private contractDetailModel: Model<ContractDetailModel>;

  constructor(
    @InjectModel(ContractDetailModel.name) model: Model<ContractDetailModel>,
  ) {
    super(model);
    this.contractDetailModel = model;
  }

  async updateDocumentation(
    contractId: Uuid,
    documentation: ContractDocumentation,
  ): Promise<void> {
    return this.contractDetailModel.findOneAndUpdate(
      { id: contractId.value },
      {
        documentation: documentation.toJson(),
      },
    );
  }

  async updateCage(contractId: Uuid, cage: ContractCage): Promise<void> {
    return this.contractDetailModel.findOneAndUpdate(
      { id: contractId.value },
      {
        cage: cage.toJson(),
      },
    );
  }

  async updateTravel(contractId: Uuid, travel: ContractTravel): Promise<void> {
    return this.contractDetailModel.findOneAndUpdate(
      { id: contractId.value },
      {
        travel: travel.toJson(),
      },
    );
  }
}
