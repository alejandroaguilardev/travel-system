import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MongoContractRepository } from '../../../contracts/infrastructure/persistence/contract-mongo.repository';
import { LaravelApiAdapter } from '../../../common/infrastructure/services/laravel-adapter.service';
import { ContractResponse } from '../../../contracts/application/response/contract.response';

/**
 * Reseña de google maps
 */

@Injectable()
export class FinishScheduleService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly laravelApiAdapter: LaravelApiAdapter,
  ) { }

  @Cron('00 09 * * *')
  async handleCron() {
    const contracts =
      await this.mongoContractRepository.findFinishAndUpdateReview();
    Promise.allSettled(contracts.map((contract) => this.mailFinish(contract)));
  }

  private mailFinish(contract: ContractResponse): void {
    this.laravelApiAdapter
      .post(`/notification/contract/finish-after`, {
        email: contract.client.email,
        client:
          contract?.client?.profile?.name +
          ' ' +
          contract?.client?.profile?.name,
        phone: contract.adviser.profile.phone,
      })
      .catch((e) => console.log(e));
  }
}
