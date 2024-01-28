import { faker } from '@faker-js/faker';
import { ContractCreateRequest } from '../../../src/contracts/application/create/contract-create-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { DateMother } from './date.mother';
import { NumberMother } from './number.mother';
import { TypeTravelingMother } from './type-traveling-mother';
import { ContractDocumentationMother } from './contract-documentation.mother';
import { CageMother } from './cage-mother';
import { ContractDefinition } from '../../../src/contracts/domain/interfaces/contract';
import { FirstNameMother } from '../../users/domain/first-name-mother';
import { EmailMother } from '../../common/domain/email-mother';

export class ContractCreatorMother {
  static create(dto?: Partial<ContractCreateRequest>): ContractCreateRequest {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UuidMother.create(),
      pets: dto?.pets ?? [UuidMother.create()],
      number: NumberMother.create(),
      startDate: DateMother.recent(),
      documentation: ContractDocumentationMother.create(),
      cage: CageMother.create(),
      travel: {
        hasServiceIncluded: faker.datatype.boolean(),
        typeTraveling: TypeTravelingMother.create(),
      },
    };
  }

  static createWithTravel(
    dto?: Partial<ContractDefinition>,
  ): ContractDefinition {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UuidMother.create(),
      pets: dto?.pets ?? [UuidMother.create()],
      number: NumberMother.create(),
      startDate: DateMother.recent(),
      endDate: dto?.endDate ?? null,
      guideNumber: dto?.guideNumber ?? '',
      status: dto?.status ?? 'in-process',
      services: {
        documentation: ContractDocumentationMother.create(),
        cage: CageMother.create(),
        travel: {
          status: 'in-process',
          hasServiceIncluded: false,
          typeTraveling: 'charge',
          airlineReservation: {
            code: NumberMother.create(),
            flightNumber: NumberMother.create(),
            departureAirport: faker.airline.airport().name,
            destinationAirport: '',
            departureDate: DateMother.recent(),
            arrivalDate: DateMother.future(),
          },
          petPerCharge: {
            receptor: FirstNameMother.create(),
            email: EmailMother.create(),
            phone: '',
            pickupDateTime: DateMother.future(),
            pickupLocation: '',
            specialRequests: '',
          },
        },
      },
    };
  }
}
