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
import { ContractDetailMongoPipeline } from './contract-detail-mongo-pipeline';
import { ContractDetailResponse } from '../../application/response/contract-detail.response';
import { ContractTopico } from '../../domain/value-object/contract-topico';

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

  async searchByIdWithPet(uuid: Uuid): Promise<ContractDetailResponse | null> {
    const rows: ContractDetailResponse[] = await this.contractDetailModel
      .aggregate(ContractDetailMongoPipeline.executeById(uuid.value))
      .exec();

    const detail = rows.length > 0 ? rows[0] : null;
    if (!detail) return null;
    const pet = detail?.pet[0][0];
    return { ...detail, pet };
  }

  async updateDocumentation(
    contractDetailId: Uuid,
    documentation: ContractDocumentation,
  ): Promise<void> {
    return this.contractDetailModel.findOneAndUpdate(
      { id: contractDetailId.value },
      {
        documentation: documentation.toJson(),
      },
    );
  }

  async updateCage(contractDetailId: Uuid, cage: ContractCage): Promise<void> {
    return this.contractDetailModel.findOneAndUpdate(
      { id: contractDetailId.value },
      {
        cage: cage.toJson(),
      },
    );
  }

  async updateTravel(
    contractDetailId: Uuid,
    travel: ContractTravel,
  ): Promise<void> {
    return this.contractDetailModel.findOneAndUpdate(
      { id: contractDetailId.value },
      {
        travel: travel.toJson(),
      },
    );
  }

  async updateTopico(
    contractDetailId: Uuid,
    topicoUpdate: ContractTopico,
  ): Promise<void> {
    return this.contractDetailModel.findOneAndUpdate(
      { id: contractDetailId.value },
      {
        topico: {
          ...topicoUpdate.toJson(),
        },
      },
    );
  }
}
