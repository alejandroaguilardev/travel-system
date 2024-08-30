import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PaymentScheduleService } from './services/payment-schedule.service';
import { ContractsModule } from '../../contracts/infrastructure/contracts.module';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { LaravelApiAdapter } from '../../common/infrastructure/services/laravel-adapter.service';
import { UbigeoModule } from '../../ubigeo/infrastructure/ubigeo.module';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import { TravelScheduleService } from './services/travel-schedule.service';
import { UbigeoQuery } from '../../ubigeo/infrastructure/ubigeo-query.service';
import { JWTAdapterService } from '../../auth/infrastructure/services/jwt.service';
import { FinishScheduleService } from './services/finish-schedule.service';
import { TravelAccompaniedScheduleService } from './services/travel-accompanied-pet.service';
import { IncidentsModule } from 'src/errors/infrastructure/incidents.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ContractsModule,
    AuthModule,
    IncidentsModule,
    UbigeoModule,
  ],
  providers: [
    DayJsService,
    LaravelApiAdapter,
    UbigeoQuery,
    JWTAdapterService,
    PaymentScheduleService,
    TravelScheduleService,
    TravelAccompaniedScheduleService,
    FinishScheduleService,
  ],
  exports: [],
})
export class ScheduleCustomModule { }
