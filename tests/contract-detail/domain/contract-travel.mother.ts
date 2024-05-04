import { faker } from '@faker-js/faker';
import {
  TravelAccompaniedPetInterface,
  TravelDestinationInterface,
  TravelInterface,
  TravelPetPerChargeInterface,
} from '../../../src/contract-detail/domain/interfaces/travel.interface';
import { UuidMother } from '../../common/domain/uuid-mother';
import { EmailMother } from '../../common/domain/email-mother';
import { FirstNameMother } from '../../users/domain/first-name-mother';
import { NumberMother } from '../../common/domain/number.mother';
import { DateMother } from '../../common/domain/date.mother';
import { UserDocument } from '../../../src/users/domain/value-object/profile/user-document';
import { PhoneMother } from '../../common/domain/phone.mother';
import { StringMother } from '../../common/domain/string.mother';

export class ContractTravelMother {
  static create(dto?: Partial<TravelInterface>): TravelInterface {
    return {
      status: 'in-process',
      guideNumber: '',
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
      petPerCharge: ContractTravelMother.petPerCharge(dto?.petPerCharge),
      destination: ContractTravelMother.destination(dto?.destination),
      accompaniedPet: ContractTravelMother.accompaniedPet(dto?.accompaniedPet),
      observation: dto?.observation ?? StringMother.create(),
    };
  }

  static petPerCharge(
    petPerCharge?: Partial<TravelPetPerChargeInterface>,
  ): TravelPetPerChargeInterface {
    return {
      name: petPerCharge?.name ?? FirstNameMother.create(),
      document:
        petPerCharge?.document ??
        UserDocument.types[faker.number.int({ min: 0, max: 3 })],
      documentNumber:
        petPerCharge?.documentNumber ??
        faker.number.int({ min: 100000000, max: 1000000000 }).toString(),
      phone: petPerCharge?.phone ?? PhoneMother.create(),
      email: petPerCharge?.email ?? EmailMother.create(),
    };
  }

  static destination(
    destination?: Partial<TravelDestinationInterface>,
  ): TravelDestinationInterface {
    return {
      cityDestination: destination?.cityDestination ?? StringMother.create(),
      directionDestination:
        destination?.directionDestination ?? StringMother.create(),
      countryDestination:
        destination?.countryDestination ?? StringMother.create(),
    };
  }
  static accompaniedPet(
    accompaniedPet?: Partial<TravelAccompaniedPetInterface>,
  ): TravelAccompaniedPetInterface {
    return {
      name: accompaniedPet?.name ?? FirstNameMother.create(),
      document:
        accompaniedPet?.document ??
        UserDocument.types[faker.number.int({ min: 0, max: 3 })],
      documentNumber:
        accompaniedPet?.documentNumber ??
        faker.number.int({ min: 100000000, max: 1000000000 }).toString(),
      phone: accompaniedPet?.phone ?? PhoneMother.create(),
      email: accompaniedPet?.email ?? EmailMother.create(),
      department:
        accompaniedPet?.department ??
        faker.number.int({ min: 10, max: 99 }).toString(),
      province:
        accompaniedPet?.province ??
        faker.number.int({ min: 1000, max: 9999 }).toString(),
      district:
        accompaniedPet?.district ??
        faker.number.int({ min: 100000, max: 999999 }).toString(),
      direction: accompaniedPet?.direction ?? faker.location.direction(),
    };
  }
}
