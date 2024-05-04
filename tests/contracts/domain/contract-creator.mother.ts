import { ContractCreateRequest } from '../../../src/contracts/application/create/contract-create-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { DateMother } from '../../common/domain/date.mother';
import { NumberMother } from '../../common/domain/number.mother';
import { ContractInterface } from '../../../src/contracts/domain/interfaces/contract.interface';
import { ContractDetailCreatorMother } from '../../contract-detail/domain/contract-creator.mother';
import { ContractPriceMother } from './contract-price.mother';
import { faker } from '@faker-js/faker';
import { PayInInstallmentMother } from './pay-in-installments.mother';
import { ContractResponse } from '../../../src/contracts/application/response/contract.response';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { StringMother } from '../../common/domain/string.mother';

export class ContractCreatorMother {
  static create(dto?: Partial<ContractCreateRequest>): ContractCreateRequest {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UuidMother.create(),
      number: dto?.number ?? NumberMother.create(),
      folder: dto?.folder ?? NumberMother.create(),
      startDate: dto?.startDate ?? DateMother.recent(),
      details: dto?.details ?? [ContractDetailCreatorMother.createWithTravel()],
      adviser: dto?.adviser ?? UuidMother.create(),
      price: dto?.price ?? ContractPriceMother.create(),
      payInInstallments:
        dto?.payInInstallments ??
        PayInInstallmentMother.create(faker.number.int({ min: 0, max: 10 })),
      reasonForCancellation: StringMother.create(),
      finishClient: false,
      format: dto?.format ?? StringMother.create(),
    };
  }

  static createWithTravel(dto?: Partial<ContractInterface>): ContractInterface {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UuidMother.create(),
      details: dto?.details ?? [ContractDetailCreatorMother.createWithTravel()],
      number: NumberMother.create(),
      folder: dto?.folder ?? NumberMother.create(),
      startDate: DateMother.recent(),
      endDate: dto?.endDate ?? null,
      status: dto?.status ?? 'in-process',
      adviser: dto?.adviser ?? UuidMother.create(),
      price: dto?.price ?? ContractPriceMother.create(),
      payInInstallments:
        dto?.payInInstallments ??
        PayInInstallmentMother.create(faker.number.int({ min: 0, max: 10 })),
      format: dto?.format ?? StringMother.create(),
      user: dto?.user ?? UuidMother.create(),
      reasonForCancellation: StringMother.create(),
      finishClient: faker.datatype.boolean(),
    };
  }

  static createResponse(dto?: Partial<ContractResponse>): ContractResponse {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UserCreatorMother.createWithPassword(),
      details: dto?.details ?? [ContractDetailCreatorMother.createWithPet()],
      number: NumberMother.create(),
      folder: dto?.folder ?? NumberMother.create(),
      startDate: DateMother.recent(),
      endDate: dto?.endDate ?? null,
      status: dto?.status ?? 'in-process',
      adviser: dto?.adviser ?? UserCreatorMother.createWithPassword(),
      price: dto?.price ?? ContractPriceMother.create(),
      format: dto?.format ?? StringMother.create(),
      payInInstallments:
        dto?.payInInstallments ??
        PayInInstallmentMother.create(faker.number.int({ min: 0, max: 10 })),
      reasonForCancellation: StringMother.create(),
      user: dto?.user ?? UuidMother.create(),
    };
  }
}
