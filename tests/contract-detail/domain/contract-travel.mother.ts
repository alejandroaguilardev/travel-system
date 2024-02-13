import { faker } from '@faker-js/faker';
import { TravelInterface } from '../../../src/contracts/domain/interfaces/travel.interface';
import { UuidMother } from '../../common/domain/uuid-mother';
import { EmailMother } from '../../common/domain/email-mother';
import { FirstNameMother } from '../../users/domain/first-name-mother';
import { NumberMother } from '../../common/domain/number.mother';
import { DateMother } from '../../common/domain/date.mother';

export class ContractTravelMother {
  static create(dto?: Partial<TravelInterface>): TravelInterface {
    return {
      status: 'in-process',
      hasServiceIncluded: false,
      hasServiceAccompanied: false,
      typeTraveling: 'charge',
      airlineReservation: {
        code: NumberMother.create(),
        flightNumber: NumberMother.create(),
        departureAirport: faker.airline.airport().name,
        destinationAirport: '',
        departureDate: DateMother.recent(),
        arrivalDate: DateMother.future(),
        user: dto?.airlineReservation?.user ?? UuidMother.create(),
      },
      petPerCharge: {
        receptor: FirstNameMother.create(),
        email: EmailMother.create(),
        phone: '',
        pickupDateTime: DateMother.future(),
        pickupLocation: '',
        specialRequests: '',
        user: dto?.petPerCharge?.user ?? UuidMother.create(),
      },
    };
  }
}
