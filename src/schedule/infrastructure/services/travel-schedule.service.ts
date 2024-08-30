import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MongoContractRepository } from '../../../contracts/infrastructure/persistence/contract-mongo.repository';
import { LaravelApiAdapter } from '../../../common/infrastructure/services/laravel-adapter.service';
import { TravelPersonNotification } from '../../../contract-detail/application/notification/travel-person-notification';
import { UbigeoQuery } from '../../../ubigeo/infrastructure/ubigeo-query.service';
import { JWTAdapterService } from '../../../auth/infrastructure/services/jwt.service';
import { TravelAccompaniedPet } from '../../../contract-detail/domain/value-object/travel/accompanied-pet/travel-accompanied-pet';
import { IncidentsService } from '../../../errors/infrastructure/incidents.service';

/**
 * Enviar un correo indicando que debe llenarlos datos de la persona que viaja como acompañante acompañante.
 */

@Injectable()
export class TravelScheduleService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly laravelApiAdapter: LaravelApiAdapter,
    private readonly ubigeoQuery: UbigeoQuery,
    private readonly jwtService: JWTAdapterService,
    private readonly incidentsService: IncidentsService,
  ) { }

  @Cron('0 7 * * 6')
  async handleCron() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
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
        if (
          !TravelAccompaniedPet.hasRequiredAccompaniedPetFields(
            detail.travel.accompaniedPet,
          )
        ) {
          requests.push(mail.execute(contract, detail));
        }
      });
    });
    Promise.allSettled(requests);
  }
}
