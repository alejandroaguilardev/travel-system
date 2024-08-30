import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MongoContractRepository } from '../../../contracts/infrastructure/persistence/contract-mongo.repository';
import { LaravelApiAdapter } from '../../../common/infrastructure/services/laravel-adapter.service';
import { TravelPersonNotification } from '../../../contract-detail/application/notification/travel-person-notification';
import { UbigeoQuery } from '../../../ubigeo/infrastructure/ubigeo-query.service';
import { JWTAdapterService } from '../../../auth/infrastructure/services/jwt.service';
import { TravelAccompaniedPet } from '../../../contract-detail/domain/value-object/travel/accompanied-pet/travel-accompanied-pet';
import { DayJsService } from '../../../common/infrastructure/services/dayjs.service';
import { IncidentsService } from '../../../errors/infrastructure/incidents.service';

/**
 * Enviar un correo indicando que la  persona que viaja es la que se tiene registrada como  en el acompañante.
 */

@Injectable()
export class TravelAccompaniedScheduleService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly laravelApiAdapter: LaravelApiAdapter,
    private readonly ubigeoQuery: UbigeoQuery,
    private readonly jwtService: JWTAdapterService,
    private readonly dayJsService: DayJsService,
    private readonly incidentsService: IncidentsService,
  ) { }

  @Cron('30 7 * * *')
  async handleCron() {
    const date = new Date();

    const contracts =
      await this.mongoContractRepository.searchPendingStartDate(date);

    const mail = new TravelPersonNotification(
      this.laravelApiAdapter,
      this.ubigeoQuery,
      this.jwtService,
      this.incidentsService,
    );

    const requests = [];

    contracts.forEach((contract) => {
      contract.details.forEach((detail) => {
        const lastWeek = this.dayJsService.getDifferenceInDays(
          detail.travel.airlineReservation.departureDate,
          new Date(),
        );
        if (
          TravelAccompaniedPet.hasRequiredAccompaniedPetFields(
            detail.travel.accompaniedPet,
          ) &&
          lastWeek === 6
        ) {
          requests.push(mail.execute(contract, detail));
        }
      });
    });
    Promise.allSettled(requests);
  }
}
