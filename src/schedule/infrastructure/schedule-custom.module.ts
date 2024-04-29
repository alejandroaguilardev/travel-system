import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PaymentScheduleService } from './services/payment-schedule.service';
import { ContractsModule } from '../../contracts/infrastructure/contracts.module';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { LaravelApiAdapter } from '../../common/infrastructure/services/mail-api-adapter.service';

@Module({
  imports: [ScheduleModule.forRoot(), ContractsModule],
  providers: [PaymentScheduleService, DayJsService, LaravelApiAdapter],
  exports: [],
})
export class ScheduleCustomModule {}
