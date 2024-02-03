import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContractRepository } from '../../domain/contract.repository';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { ContractModel } from '../schema/contract.schema';
import { Contract } from '../../domain/contract';
import { ContractResponse } from '../../application/response/contract.response';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractEndDate, ContractStatus } from '../../domain/value-object';
import {
  ContractTravel,
  ContractCage,
  ContractDocumentation,
} from '../../domain/value-object/services';

@Injectable()
export class MongoContractRepository
  extends MongoRepository<ContractModel, Contract>
  implements ContractRepository
{
  private contractModel: Model<ContractModel>;

  constructor(@InjectModel(ContractModel.name) model: Model<ContractModel>) {
    super(model);
    this.contractModel = model;
  }

  async searchContractByClient(clientId: Uuid): Promise<ContractResponse[]> {
    const rows = await this.contractModel
      .find({ client: clientId.value, endDate: null })
      .select(['-_id', '-__v', '-createdAt', '-updatedAt'])
      .sort({ createdAt: -1 })
      .lean();

    return rows;
  }

  async updateDocumentation(
    contractId: Uuid,
    status: ContractStatus,
    documentation: ContractDocumentation,
  ): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        status: status.value,
        services: {
          documentation: documentation.toJson(),
        },
      },
    );
  }

  async updateCage(
    contractId: Uuid,
    status: ContractStatus,
    cage: ContractCage,
  ): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        status: status.value,
        services: {
          cage: cage.toJson(),
        },
      },
    );
  }

  async updateTravel(
    contractId: Uuid,
    status: ContractStatus,
    travel: ContractTravel,
  ): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        status: status.value,
        services: {
          travel: travel.toJson(),
        },
      },
    );
  }

  async finish(contractId: Uuid, endDate: ContractEndDate): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        endDate: endDate.value,
      },
    );
  }
}
