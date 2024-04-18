import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from '../../mail/infrastructure/mail.module';
import { PaymentScheduleService } from './services/payment-schedule.service';
import { ContractsModule } from '../../contracts/infrastructure/contracts.module';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';

@Module({
  imports: [ScheduleModule.forRoot(), MailModule, ContractsModule],
  providers: [PaymentScheduleService, DayJsService],
  exports: [],
})
export class ScheduleCustomModule {}
