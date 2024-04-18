import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MongoContractRepository } from '../../../contracts/infrastructure/persistence/contract-mongo.repository';
import { MailContractService } from '../../../mail/infrastructure/mail-contract.service';
import { ContractSearchPayments } from '../../../contracts/application/search-payments/contract-search-payments';
import { DayJsService } from '../../../common/infrastructure/services/dayjs.service';

@Injectable()
export class PaymentScheduleService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly dayJsService: DayJsService,
    private readonly mailerService: MailContractService,
  ) {}

  @Cron('00 08 * * *')
  async handleCron() {
    const contractSearchPayments = new ContractSearchPayments(
      this.mongoContractRepository,
      this.dayJsService,
    );
    const contracts = await contractSearchPayments.execute();

    Promise.allSettled(
      contracts.map((contract) => this.mailerService.contractPayment(contract)),
    );
  }
}
