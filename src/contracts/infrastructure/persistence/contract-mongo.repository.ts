import { ContractRepository } from '../../domain/contract.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { ContractModel } from '../schema/contract.schema';
import { Contract } from '../../domain/contract';
import { ContractResponse } from 'src/contracts/application/response/contract.response';
import { Uuid } from '../../../common/domain/value-object/uuid';

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
      .find({ client: clientId.value })
      .select(['-_id', '-__v', '-createdAt', '-updatedAt'])
      .sort({ createdAt: -1 })
      .lean();

    return rows;
  }
}
