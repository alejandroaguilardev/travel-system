import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MongoContractRepository } from '../../../contracts/infrastructure/persistence/contract-mongo.repository';
import { ContractSearchPayments } from '../../../contracts/application/search-payments/contract-search-payments';
import { DayJsService } from '../../../common/infrastructure/services/dayjs.service';
import { LaravelApiAdapter } from '../../../common/infrastructure/services/laravel-adapter.service';
import { PendingPaymentNotification } from '../../../contracts/application/notification/peding-payment-notification';
import { IncidentsService } from '../../../errors/infrastructure/incidents.service';

/**
 * Recordatorio de pagos pendientes
 */
@Injectable()
export class PaymentScheduleService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly laravelApiAdapter: LaravelApiAdapter,
    private readonly dayJsService: DayJsService,
    private readonly incidentsService: IncidentsService,
  ) { }



  @Cron('00 09 * * 1')
  async handleCron() {
    const contractSearchPayments = new ContractSearchPayments(
      this.mongoContractRepository,
      this.dayJsService,
    );
    const contracts = await contractSearchPayments.execute();
    const mail = new PendingPaymentNotification(
      this.laravelApiAdapter,
      this.dayJsService,
      this.incidentsService,
    );
    Promise.allSettled(contracts.map((contract) => mail.execute(contract)));
  }
}
