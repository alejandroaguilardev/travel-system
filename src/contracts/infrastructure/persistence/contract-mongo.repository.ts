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
import { ContractMongoPipeline } from './contract-mongo.pipeline';
import { ContractDetail } from '../../../contract-detail/domain/contract-detail';
import { ContractReasonForCancellation } from '../../domain/value-object/reason-for-cancellation';
import { PayInInstallments } from '../../domain/value-object/pay-in-installments/pay-in-installments';
import { ContractStatusInterface } from '../../domain/interfaces/contract.interface';

@Injectable()
export class MongoContractRepository
  extends MongoRepository<ContractModel, Contract>
  implements ContractRepository {
  private contractModel: Model<ContractModel>;

  constructor(@InjectModel(ContractModel.name) model: Model<ContractModel>) {
    super(model);
    this.contractModel = model;
  }

  async save(data: Contract): Promise<void> {
    const correlative: number = await this.contractModel
      .find()
      .countDocuments();
    const newData = { ...data.toJson(), correlative: correlative + 1 };
    await this.contractModel.create(newData);
  }

  async search<ContractResponse>(
    criteria: Criteria,
  ): Promise<ResponseSearch<ContractResponse>> {
    const results: any = await this.contractModel
      .aggregate(ContractMongoPipeline.execute(criteria))
      .exec();
    return { rows: results[0]?.rows ?? [], count: results[0]?.totalCount ?? 0 } as ResponseSearch<ContractResponse>;
  }

  async searchPaymentsMissing(criteria: Criteria): Promise<ContractResponse[]> {
    const rows: ContractResponse[] = await this.contractModel
      .aggregate(ContractMongoPipeline.executePayments(criteria))
      .exec();
    return rows;
  }

  async searchPendingStartDate(date: Date): Promise<ContractResponse[]> {
    const query = {
      $and: [{ 'status.petTravel': 'pending' }, { startDate: { $lt: date } }],
    };
    const rows: ContractResponse[] = await this.contractModel
      .aggregate(ContractMongoPipeline.executeTravelFound(query))
      .exec();
    return rows;
  }

  async findFinishAndUpdateReview(): Promise<ContractResponse[]> {
    const date = new Date();
    date.setDate(date.getDate() - 2);

    const query = {
      $and: [{ 'status.petTravel': 'completed' }, { endDate: { $lt: date } }],
    };
    const rows: ContractResponse[] = await this.contractModel
      .aggregate(ContractMongoPipeline.executeTravelFound(query))
      .exec();

    const ids = rows.map((_) => ({ id: _.id }));
    await this.contractModel.updateMany(ids, { hasMailSendReview: true });
    return rows;
  }

  async searchByIdWithPet(uuid: Uuid): Promise<ContractResponse | null> {
    const rows: ContractResponse[] = await this.contractModel
      .aggregate(ContractMongoPipeline.executeById(uuid.value))
      .exec();

    const detail = rows.length > 0 ? rows[0] : null;
    if (!detail) return null;
    return detail;
  }

  async finish(
    contractId: Uuid,
    endDate: ContractEndDate,
    status: ContractStatusInterface,
  ): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        status,
        endDate: endDate.value,
      },
    );
  }

  async cancel(
    contractId: Uuid,
    endDate: ContractEndDate,
    reasonForCancellation: ContractReasonForCancellation,
    status: ContractStatusInterface,
  ): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        endDate: endDate.value,
        reasonForCancellation: reasonForCancellation.value,
        status,
        finishClient: true,
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

  async updatePayment(
    contractId: Uuid,
    payInInstallments: PayInInstallments,
  ): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        payInInstallments: payInInstallments.toJson(),
      },
    );
  }

  async updateDetail(
    contractId: Uuid,
    details: ContractDetail[],
  ): Promise<void> {
    return this.contractModel.findOneAndUpdate(
      { id: contractId.value },
      {
        details: details.map((detail) => detail.toJson()),
      },
    );
  }
}
