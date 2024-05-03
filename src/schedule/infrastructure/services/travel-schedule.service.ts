import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MongoContractRepository } from '../../../contracts/infrastructure/persistence/contract-mongo.repository';
import { LaravelApiAdapter } from '../../../common/infrastructure/services/mail-api-adapter.service';
import { TravelPersonMail } from '../../../contract-detail/application/mail/travel-person-mail';
import { UbigeoQuery } from '../../../ubigeo/infrastructure/ubigeo-query.service';
import { JWTAdapterService } from '../../../auth/infrastructure/services/jwt.service';
import { TravelAccompaniedPet } from '../../../contract-detail/domain/value-object/travel/accompanied-pet/travel-accompanied-pet';

@Injectable()
export class TravelScheduleService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mailApiAdapter: LaravelApiAdapter,
    private readonly ubigeoQuery: UbigeoQuery,
    private readonly jwtService: JWTAdapterService,
  ) {}

  @Cron('0 7 * * 6')
  async handleCron() {
    const contracts = await this.mongoContractRepository.searchTravelFound();

    const mail = new TravelPersonMail(
      this.mailApiAdapter,
      this.ubigeoQuery,
      this.jwtService,
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
