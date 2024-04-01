import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContractRepository } from '../../domain/contract.repository';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { ContractModel } from '../schema/contract.schema';
import { Contract } from '../../domain/contract';
import { ContractResponse } from '../../application/response/contract.response';
import { Uuid } from '../../../common/domain/value-object/uuid';
import {
  ContractEndDate,
  ContractNumber,
  ContractFolder,
} from '../../domain/value-object';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import { MongoCriteriaConverter } from '../../../common/infrastructure/mongo/mongo-criteria-converter';
import { ContractMongoPipeline } from './contract-mongo.pipeline';

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

  async search<ContractResponse>(
    criteria: Criteria,
  ): Promise<ResponseSearch<ContractResponse>> {
    const rows: ContractResponse[] = await this.contractModel
      .aggregate(ContractMongoPipeline.execute(criteria))
      .exec();

    const count = await this.count(criteria);

    return { rows, count };
  }

  async searchClient(
    criteria: Criteria,
  ): Promise<ResponseSearch<ContractResponse>> {
    const { query, selectProperties, start, size, sortQuery } =
      MongoCriteriaConverter.converter(criteria);

    const rows: ContractResponse[] = await this.contractModel
      .find(query)
      .select([...selectProperties, '-_id', '-__v', '-createdAt', '-updatedAt'])
      .skip(start)
      .limit(size)
      .sort(sortQuery)
      .lean();

    const count = await this.count(criteria);

    return { rows, count };
  }

  async searchTopico(
    criteria: Criteria,
  ): Promise<ResponseSearch<ContractResponse>> {
    const { query, selectProperties, start, size, sortQuery } =
      MongoCriteriaConverter.converter(criteria);

    const rows: ContractResponse[] = await this.contractModel
      .find(query)
      .select([...selectProperties, '-_id', '-__v', '-createdAt', '-updatedAt'])
      .skip(start)
      .limit(size)
      .sort(sortQuery)
      .lean();

    const count = await this.count(criteria);

    return { rows, count };
  }

  async finish(contractId: Uuid, endDate: ContractEndDate): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        endDate: endDate.value,
      },
    );
  }

  async cancel(contractId: Uuid, endDate: ContractEndDate): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        endDate: endDate.value,
        status: 'canceled',
      },
    );
  }

  async updateFolder(
    contractId: Uuid,
    folder: ContractFolder,
    number: ContractNumber,
  ): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        folder: folder.value,
        number: number.value,
      },
    );
  }
}
